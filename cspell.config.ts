import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	// Chagent generates the changelog.
	ignorePaths: ['**/changelog.md'],
	words: ['chagent', 'slbl', 'sopt', 'sthmb', 'thmb', 'thumbv', 'tptl'],
})
