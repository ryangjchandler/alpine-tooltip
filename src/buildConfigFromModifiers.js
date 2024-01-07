import { followCursor } from 'tippy.js'

export const buildConfigFromModifiers = modifiers => {
    const config = {
        plugins: [],
    }

    const getModifierArgument = (modifier) => {
        return modifiers[modifiers.indexOf(modifier) + 1]
    }

    if (modifiers.includes('animation')) {
        config.animation = getModifierArgument('animation')
    }

    if (modifiers.includes('duration')) {
        config.duration = parseInt(getModifierArgument('duration'))
    }

    if (modifiers.includes('delay')) {
        const delay = getModifierArgument('delay')

        config.delay = delay.includes('-')
            ? delay.split('-').map(n => parseInt(n))
            : parseInt(delay)
    }

    if (modifiers.includes('cursor')) {
        config.plugins.push(followCursor)

        const next = getModifierArgument('cursor')

        if (['x', 'initial'].includes(next)) {
            config.followCursor = next === 'x' ? 'horizontal' : 'initial'
        } else {
            config.followCursor = true
        }
    }

    if (modifiers.includes('on')) {
        config.trigger = getModifierArgument('on')
    }

    if (modifiers.includes('arrowless')) {
        config.arrow = false
    }

    if (modifiers.includes('html')) {
        config.allowHTML = true
    }

    if (modifiers.includes('interactive')) {
        config.interactive = true
    }

    if (modifiers.includes('border') && config.interactive) {
        config.interactiveBorder = parseInt(getModifierArgument('border'))
    }

    if (modifiers.includes('debounce') && config.interactive) {
        config.interactiveDebounce = parseInt(getModifierArgument('debounce'))
    }

    if (modifiers.includes('max-width')) {
        config.maxWidth = parseInt(getModifierArgument('max-width'))
    }

    if (modifiers.includes('theme')) {
        config.theme = getModifierArgument('theme')
    }

    if (modifiers.includes('placement')) {
        config.placement = getModifierArgument('placement')
    }

    const popperOptions = {}

    if (modifiers.includes('no-flip')) {
        popperOptions.modifiers ||= [];
        popperOptions.modifiers.push({ name: 'flip', enabled: false });
    }

    config.popperOptions = popperOptions;

    return config
}
