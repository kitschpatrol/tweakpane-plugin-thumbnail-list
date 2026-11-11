import type { Value, View, ViewProps } from '@tweakpane/core'
import { ClassName } from '@tweakpane/core'
import type { Thumbnail } from './controller'
import { checkerImage as CHECKER_IMG_SRC } from './checker-image'

type Config = {
	value: Value<null | Thumbnail>
	valueOptions: Thumbnail[]
	viewProps: ViewProps
}

const className = ClassName('thumb')

// Custom view class should implement `View` interface
export class PluginView implements View {
	public readonly element: HTMLElement
	private readonly doc_: Document
	private readonly optionEls_: HTMLElement[] = []
	private readonly overlayEl_: HTMLElement
	private readonly selectEl_: HTMLElement
	private readonly selectLabelEl_: HTMLElement
	private readonly selectThumbEl_: HTMLElement
	private readonly value_: Value<null | Thumbnail>
	private readonly valueOptions_: Thumbnail[]

	constructor(doc: Document, config: Config) {
		this.onSelect_ = this.onSelect_.bind(this)
		this.open_ = this.open_.bind(this)
		this.close_ = this.close_.bind(this)

		// DOM.

		this.doc_ = doc

		this.element = doc.createElement('div')
		this.element.classList.add(className())

		this.selectEl_ = document.createElement('div')
		this.selectEl_.classList.add(className('sopt'))
		this.element.append(this.selectEl_)

		this.selectThumbEl_ = document.createElement('div')
		this.selectThumbEl_.classList.add(className('sthmb'))
		this.selectEl_.append(this.selectThumbEl_)

		this.selectLabelEl_ = document.createElement('span')
		this.selectLabelEl_.classList.add(className('slbl'))
		this.selectEl_.append(this.selectLabelEl_)

		this.overlayEl_ = doc.createElement('div')
		this.overlayEl_.classList.add(className('ovl'))
		this.element.append(this.overlayEl_)

		// Events.

		this.selectEl_.addEventListener('click', this.open_)

		config.viewProps.bindClassModifiers(this.element)

		this.value_ = config.value
		this.value_.emitter.on('change', this.onValueChange_.bind(this))
		this.valueOptions_ = config.valueOptions

		this.init_()
		this.refresh_()

		config.viewProps.handleDispose(() => {
			this.selectEl_.removeEventListener('click', this.open_)
			this.doc_.removeEventListener('click', this.close_)

			let rowElement
			while ((rowElement = this.optionEls_.pop())) {
				rowElement.removeEventListener('click', this.onSelect_)
				rowElement.remove()
			}
		})
	}

	/** Closes the overlay. */
	private close_() {
		this.element.classList.remove(className('-active'))
		this.doc_.removeEventListener('click', this.close_)
	}

	/**
	 * Given a click event somewhere in an option, finds the nearest option
	 * element.
	 */
	private findOptionEl_(element: HTMLElement | null): HTMLElement {
		while (element && element.dataset.value === undefined) {
			element = element.parentElement
		}

		if (!element) {
			throw new Error('Invalid DOM scope')
		}

		return element
	}

	private init_(): void {
		const doc = this.element.ownerDocument

		const createOptionElement = (thumbnail: null | Thumbnail) => {
			const thumbElement = doc.createElement('div')
			thumbElement.classList.add(className('thmb'))
			thumbElement.style.backgroundImage = thumbnail
				? `url(${thumbnail.src})`
				: `url(${CHECKER_IMG_SRC})`

			const labelElement = doc.createElement('span')
			labelElement.classList.add(className('lbl'))
			labelElement.textContent = thumbnail ? thumbnail.text : 'None'

			const optionElement = doc.createElement('div')
			optionElement.classList.add(className('opt'))
			optionElement.append(thumbElement)
			optionElement.append(labelElement)
			optionElement.dataset.value = thumbnail ? thumbnail.value : ''
			optionElement.addEventListener('click', this.onSelect_)

			this.optionEls_.push(optionElement)
			this.overlayEl_.append(optionElement)
		}

		createOptionElement(null)
		for (const thumbnail of this.valueOptions_) {
			createOptionElement(thumbnail)
		}
	}

	/** Selects the thumbnail element clicked. */
	private onSelect_(event: MouseEvent) {
		const optionElement = this.findOptionEl_(event.target as HTMLElement)
		const { value } = optionElement.dataset
		const thumbnail = this.valueOptions_.find((option) => option.value === value)
		this.value_.setRawValue(thumbnail ?? null)
	}

	/** Change handler. */
	private onValueChange_() {
		this.refresh_()
	}

	/** Opens the overlay. */
	private open_(event: MouseEvent) {
		this.element.classList.add(className('-active'))
		this.doc_.addEventListener('click', this.close_)
		event.stopPropagation()
	}

	/** Updates UI state after a value change. */
	private refresh_(): void {
		const active = this.value_.rawValue

		if (active) {
			this.selectThumbEl_.style.backgroundImage = `url(${active.src})`
			this.selectLabelEl_.textContent = active.text
		} else {
			this.selectThumbEl_.style.backgroundImage = `url(${CHECKER_IMG_SRC})`
			this.selectLabelEl_.textContent = ''
		}

		const activeValue = active ? active.value : ''
		for (const optionElement of this.optionEls_) {
			// eslint-disable-next-line unicorn/prefer-toggle-attribute -- ARIA requires the explicit string true, not an empty attribute.
			if (optionElement.dataset.value === activeValue) {
				optionElement.setAttribute('aria-selected', 'true')
			} else {
				optionElement.removeAttribute('aria-selected')
			}
		}
	}
}
