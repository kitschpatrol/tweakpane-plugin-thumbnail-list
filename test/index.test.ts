import { Pane } from 'tweakpane'
import { afterEach, describe, expect, it } from 'vitest'
import * as plugin from '../src/index'
import { TweakpaneThumbnailListPlugin } from '../src/plugin'

const options = [
	{ src: 'https://example.com/first.png', text: 'First', value: 'first' },
	{ data: { id: 2 }, src: 'https://example.com/second.png', text: 'Second', value: 'second' },
	{ src: 'https://example.com/third.png', text: 'Third', value: 'third' },
]

// Sass leaves function calls in custom property values unevaluated unless they are interpolated
const sassFunctionPattern = /tp\.cssVar/iu
const thumbSizePattern =
	/--tptl-thumb-size:\s*var\(\s*--tp-plugin-thumbnail-list-thumb-size,\s*var\(--cnt-usz\)\s*\)/u

describe('thumbnail list plugin', () => {
	let pane: Pane | undefined

	afterEach(() => {
		pane?.dispose()
		pane = undefined
	})

	function setup(value: unknown = 'first') {
		pane = new Pane()
		pane.registerPlugin(plugin)
		const params: { image: unknown } = { image: value }
		const binding = pane.addBinding(params, 'image', { options, view: 'thumbnail-list' })
		const root = binding.element.querySelector<HTMLElement>('.tp-thumbv')
		const select = binding.element.querySelector<HTMLElement>('.tp-thumbv_sopt')
		const selectLabel = binding.element.querySelector<HTMLElement>('.tp-thumbv_slbl')
		const selectThumbnail = binding.element.querySelector<HTMLElement>('.tp-thumbv_sthmb')
		if (!root || !select || !selectLabel || !selectThumbnail) {
			throw new Error('The thumbnail list view was not created')
		}

		const changes: Array<{ last: boolean; value: unknown }> = []
		binding.on('change', (event) => {
			changes.push({ last: event.last, value: event.value })
		})

		const getOptions = () => [...root.querySelectorAll<HTMLElement>('.tp-thumbv_opt')]
		const getOption = (optionValue: string) => {
			const option = getOptions().find((element) => element.dataset.value === optionValue)
			if (!option) {
				throw new Error(`No option with the value "${optionValue}"`)
			}

			return option
		}

		const getSelectedValues = () =>
			getOptions()
				.filter((element) => element.getAttribute('aria-selected') === 'true')
				.map((element) => element.dataset.value)

		const isOpen = () => root.classList.contains('tp-thumbv_-active')

		return {
			binding,
			changes,
			getOption,
			getOptions,
			getSelectedValues,
			isOpen,
			pane,
			params,
			root,
			select,
			selectLabel,
			selectThumbnail,
		}
	}

	it('accepts only strings with the requested view and valid thumbnail options', () => {
		expect(
			TweakpaneThumbnailListPlugin.accept('first', { options, view: 'thumbnail-list' })
				?.initialValue,
		).toBe('first')
		expect(
			TweakpaneThumbnailListPlugin.accept('', { options: [], view: 'thumbnail-list' }),
		).not.toBeNull()
		expect(TweakpaneThumbnailListPlugin.accept(42, { options, view: 'thumbnail-list' })).toBeNull()
		expect(
			TweakpaneThumbnailListPlugin.accept(undefined, { options, view: 'thumbnail-list' }),
		).toBeNull()
		expect(TweakpaneThumbnailListPlugin.accept('first', { options })).toBeNull()
		expect(TweakpaneThumbnailListPlugin.accept('first', { options, view: 'list' })).toBeNull()
		expect(TweakpaneThumbnailListPlugin.accept('first', { view: 'thumbnail-list' })).toBeNull()
		expect(
			TweakpaneThumbnailListPlugin.accept('first', { options: {}, view: 'thumbnail-list' }),
		).toBeNull()
		expect(
			TweakpaneThumbnailListPlugin.accept('first', {
				options: [{ text: 'First', value: 'first' }],
				view: 'thumbnail-list',
			}),
		).toBeNull()
		expect(
			TweakpaneThumbnailListPlugin.accept('first', {
				options: [{ src: 'first.png', text: 'First', value: 1 }],
				view: 'thumbnail-list',
			}),
		).toBeNull()
	})

	it('registers the bundle and installs its compiled styles', () => {
		setup()
		expect(plugin.css).toContain('.tp-thumbv')
		expect(plugin.css).not.toContain('@use')
		expect(document.head.textContent).toContain('.tp-thumbv')
	})

	it('compiles the thumbnail size fallback to the container unit size variable', () => {
		expect(plugin.css).not.toMatch(sassFunctionPattern)
		expect(plugin.css).toMatch(thumbSizePattern)
	})

	it('installs its styles alongside a textarea bundle', () => {
		const isolatedDocument = document.implementation.createHTMLDocument()
		pane = new Pane({ document: isolatedDocument })
		pane.registerPlugin({ css: '.textarea-test {}', id: 'textarea', plugins: [] })
		pane.registerPlugin(plugin)
		expect(plugin.id).toBe('thumbnail-list')
		expect(isolatedDocument.head.textContent).toContain('.textarea-test')
		expect(isolatedDocument.head.textContent).toContain(plugin.css)
	})

	it('renders a none option followed by each thumbnail option', () => {
		const { getOptions, getSelectedValues, selectLabel, selectThumbnail } = setup()
		expect(getOptions().map((element) => element.textContent)).toEqual([
			'None',
			'First',
			'Second',
			'Third',
		])
		expect(getOptions().map((element) => element.dataset.value)).toEqual([
			'',
			'first',
			'second',
			'third',
		])
		expect(getSelectedValues()).toEqual(['first'])
		expect(selectLabel.textContent).toBe('First')
		expect(selectThumbnail.style.backgroundImage).toContain('https://example.com/first.png')
	})

	it('opens the overlay from the selection and closes it on the next click', () => {
		const { isOpen, select } = setup()
		expect(isOpen()).toBe(false)
		select.click()
		expect(isOpen()).toBe(true)
		document.body.click()
		expect(isOpen()).toBe(false)
	})

	it('writes the clicked thumbnail, marks it selected, and closes the overlay', () => {
		const { changes, getOption, getSelectedValues, isOpen, params, select, selectLabel } = setup()
		select.click()
		getOption('second').querySelector<HTMLElement>('.tp-thumbv_lbl')?.click()
		expect(params.image).toBe('second')
		expect(changes).toEqual([{ last: true, value: 'second' }])
		expect(getSelectedValues()).toEqual(['second'])
		expect(selectLabel.textContent).toBe('Second')
		expect(isOpen()).toBe(false)
	})

	it('writes undefined when the none option is clicked', () => {
		const { getOption, getSelectedValues, params, selectLabel, selectThumbnail } = setup()
		getOption('').click()
		expect(params.image).toBeUndefined()
		expect(getSelectedValues()).toEqual([''])
		expect(selectLabel.textContent).toBe('')
		expect(selectThumbnail.style.backgroundImage).toContain('data:image/png;base64,')
	})

	it('refreshes when the bound value changes externally', () => {
		const { binding, getSelectedValues, params, selectLabel } = setup()
		params.image = 'third'
		binding.refresh()
		expect(getSelectedValues()).toEqual(['third'])
		expect(selectLabel.textContent).toBe('Third')
	})

	it('selects the none option for an unknown initial value', () => {
		const { getSelectedValues, selectLabel } = setup('missing')
		expect(getSelectedValues()).toEqual([''])
		expect(selectLabel.textContent).toBe('')
	})

	it('inherits the pane disabled state', () => {
		const { pane: currentPane, root } = setup()
		currentPane.disabled = true
		expect(root.classList.contains('tp-v-disabled')).toBe(true)
		currentPane.disabled = false
		expect(root.classList.contains('tp-v-disabled')).toBe(false)
	})

	it('removes listeners and options when the binding is disposed', () => {
		const { binding, getOptions, isOpen, params, root, select } = setup()
		const secondOption = getOptions()[2]
		select.click()
		binding.dispose()
		expect(getOptions()).toEqual([])
		expect(secondOption?.isConnected).toBe(false)
		secondOption?.click()
		expect(params.image).toBe('first')

		document.body.click()
		expect(isOpen()).toBe(true)
		root.classList.remove('tp-thumbv_-active')
		select.click()
		expect(isOpen()).toBe(false)
		expect(binding.element.isConnected).toBe(false)
	})
})
