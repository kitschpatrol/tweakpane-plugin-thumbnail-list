import type { BaseInputParams, BindingTarget, InputBindingPlugin } from '@tweakpane/core'
import { CompositeConstraint, createPlugin, parseRecord } from '@tweakpane/core'
import type { Thumbnail } from './controller'
import { PluginController } from './controller'

export type PluginInputParams = BaseInputParams & {
	options: Thumbnail[]
	view: 'thumbnail-list'
}

/** Writes the selected thumbnail's value, or `undefined` for no selection. */
function writeThumbnail(target: BindingTarget, inValue: null | Thumbnail): void {
	target.write(inValue?.value)
}

/**
 * Thumbnail List Plugin
 *
 * `InputBindingPlugin<In, Ex, P>` means...
 *
 * - The plugin receives the bound value as `Ex`,
 * - Converts `Ex` into `In` and holds it
 * - P is the type of the parsed parameters
 */
export const TweakpaneThumbnailListPlugin: InputBindingPlugin<
	null | Thumbnail,
	string,
	PluginInputParams
> = createPlugin({
	accept(exValue: unknown, params: Record<string, unknown>) {
		if (typeof exValue !== 'string') {
			return null
		}

		const result = parseRecord<PluginInputParams>(params, (p) => ({
			options: p.required.array(
				p.required.object({
					data: p.optional.custom((d) => d),
					src: p.required.string,
					text: p.required.string,
					value: p.required.string,
				}),
			),
			view: p.required.constant('thumbnail-list'),
		}))

		if (!result) {
			return null
		}

		return {
			initialValue: exValue,
			params: result,
		}
	},
	binding: {
		/** Creates a value constraint from the user input. */
		constraint(_args) {
			return new CompositeConstraint([])
		},
		/** Converts an external unknown value into the internal value. */
		reader(args) {
			return (exValue: unknown): null | Thumbnail =>
				args.params.options.find((option) => option.value === exValue) ?? null
		},
		writer(_args) {
			return writeThumbnail
		},
	},
	controller(args) {
		return new PluginController(args.document, {
			value: args.value,
			valueOptions: args.params.options,
			viewProps: args.viewProps,
		})
	},
	id: 'thumbnail-list',
	type: 'input',
})
