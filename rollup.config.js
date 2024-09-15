/* eslint-env node */

import {nodeResolve} from '@rollup/plugin-node-resolve';
import Replace from '@rollup/plugin-replace';
import Typescript from '@rollup/plugin-typescript';
import Autoprefixer from 'autoprefixer';
import Postcss from 'postcss';
import Cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import * as Sass from 'sass';

import Package from './package.json' with {type: 'json'};

async function compileCss() {
	const css = Sass.renderSync({
		file: 'src/sass/plugin.scss',
		outputStyle: 'compressed',
	}).css.toString();

	const result = await Postcss([Autoprefixer]).process(css, {
		from: undefined,
	});
	return result.css.replace(/'/g, "\\'").trim();
}

function getPlugins(css, shouldMinify) {
	const plugins = [
		Typescript({
			tsconfig: 'src/tsconfig.json',
		}),
		nodeResolve(),
		Replace({
			__css__: css,
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
	const css = await compileCss();
	return {
		input: 'src/index.ts',
		external: ['tweakpane', '@tweakpane/core'],
		output: {
			file: `dist/${distName}${postfix}.js`,
			format: 'esm',
		},
		plugins: getPlugins(css, production),

		// Suppress `Circular dependency` warning
		onwarn(warning, rollupWarn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			rollupWarn(warning);
		},
	};
};
