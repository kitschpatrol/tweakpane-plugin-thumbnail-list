import type { TpPlugin } from 'tweakpane'
import { TweakpaneThumbnailListPlugin } from './plugin'
import pluginCss from './styles/plugin.scss?inline'

export const id = 'textarea'

export const css: string = pluginCss

export const plugins: TpPlugin[] = [TweakpaneThumbnailListPlugin]
