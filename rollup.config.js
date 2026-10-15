/* eslint-env node */

import {nodeResolve} from '@rollup/plugin-node-resolve';
import Replace from '@rollup/plugin-replace';
import Typescript from '@rollup/plugin-typescript';
import Autoprefixer from 'autoprefixer';
import Postcss from 'postcss';
import Cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import {compile as sassCompile} from 'sass';
import {fileURLToPath} from 'node:url';

import Package from './package.json' with {type: 'json'};

const sassEntry = 'src/sass/plugin.scss';

async function compileCss() {
	const compiled = sassCompile(sassEntry, {
		style: 'compressed',
		silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
	});

	const result = await Postcss([Autoprefixer]).process(compiled.css, {
		from: undefined,
	});
	return {
		css: result.css.replace(/'/g, "\\'").trim(),
		files: compiled.loadedUrls.map((url) => fileURLToPath(url)),
	};
}

function getPlugins(shouldMinify) {
	let css = '';
	let sassFiles = [sassEntry];
	const plugins = [
		{
			// Recompiles Sass on every build so watch mode picks up stylesheet edits
			name: 'compile-css',
			async buildStart() {
				// Watch the last known files first so a Sass error stays recoverable
				for (const sassFile of sassFiles) this.addWatchFile(sassFile);
				({css, files: sassFiles} = await compileCss());
				for (const sassFile of sassFiles) this.addWatchFile(sassFile);
			},
			transform(code) {
				// Make the Sass files transform dependencies of the module that inlines the CSS,
				// so watch mode re-transforms it (re-running Replace) when a stylesheet changes
				if (code.includes('__css__')) {
					for (const sassFile of sassFiles) this.addWatchFile(sassFile);
				}
				return null;
			},
		},
		Typescript({
			tsconfig: 'src/tsconfig.json',
		}),
		nodeResolve(),
		Replace({
			__css__: () => css,
			__checker_img_src__: 
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA4klEQVR4Xu2awQ3EQAjEbjun9Ohq8ANZOP8JZDBstOL94DMzQ16xrX8k+b92+wNo/AyIAOgARXBbXwtAABqC2wjT+LVALQAdoAhu62sBCECnwDbCNH4tcL4FKEJ2/bN/AM0/A6iDdn0E2CtI848A6qBdHwH2CtL8I4A6aNdHgL2CNP8IoA7a9d0Inb8RygDoQDOgHaGWpNoSI2Nke4b0H0Cq155gi5JtirYfsD3FafxOgfOnAEXIru9KzF5Bmn8EUAft+giwV5DmHwHUQbs+AuwVpPlHAHXQro8AewVp/ucJ+AAX4sBQqPDC3AAAAABJRU5ErkJggg==',
			preventAssignment: false,
		}),
	];
	if (shouldMinify) {
		plugins.push(terser());
	}
	return [
		...plugins,
		// https://github.com/microsoft/tslib/issues/47
		Cleanup({
			comments: 'none',
		}),
	];
}

function getDistName(packageName) {
	return packageName.replace(/^@[^\/]+\//, '');
}

export default async () => {
	const production = process.env.BUILD === 'production';
	const postfix = production ? '.min' : '';

	const distName = getDistName(Package.name);
	return {
		input: 'src/index.ts',
		external: ['tweakpane', '@tweakpane/core'],
		output: {
			file: `dist/${distName}${postfix}.js`,
			format: 'esm',
		},
		plugins: getPlugins(production),

		// Suppress `Circular dependency` warning
		onwarn(warning, rollupWarn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			rollupWarn(warning);
		},
	};
};
