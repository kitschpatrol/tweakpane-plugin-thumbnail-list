import type { Controller, Value, ViewProps } from '@tweakpane/core'
import { PluginView } from './view'

type Config = {
	value: Value<null | Thumbnail>
	valueOptions: Thumbnail[]
	viewProps: ViewProps
}

export type Thumbnail = {
	data?: unknown
	src: string
	text: string
	value: string
}

/** Thumbnail List Controller */
export class PluginController implements Controller<PluginView> {
	public readonly value: Value<null | Thumbnail>
	public readonly view: PluginView
	public readonly viewProps: ViewProps

	constructor(doc: Document, config: Config) {
		this.value = config.value
		this.viewProps = config.viewProps
		this.viewProps.handleDispose(() => {
			//
		})

		this.view = new PluginView(doc, {
			value: this.value,
			valueOptions: config.valueOptions,
			viewProps: this.viewProps,
		})
	}
}
