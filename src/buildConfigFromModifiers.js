import { followCursor } from 'tippy.js'

export const buildConfigFromModifiers = modifiers => {
    const config = {
        plugins: [],
    }

    if (modifiers.includes('duration')) {
        config.duration = parseInt(modifiers[modifiers.indexOf('duration') + 1])
    }

    if (modifiers.includes('delay')) {
        config.delay = parseInt(modifiers[modifiers.indexOf('delay') + 1])
    }

    if (modifiers.includes('cursor')) {
        config.plugins.push(followCursor)

        const next = modifiers[modifiers.indexOf('cursor') + 1] ?? null

        if (['x', 'initial'].includes(next)) {
            config.followCursor = next === 'x' ? 'horizontal' : 'initial'
        } else {
            config.followCursor = true
        }
    }

    if (modifiers.includes('on')) {
        config.trigger = modifiers[modifiers.indexOf('on') + 1]
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
        config.interactiveBorder = parseInt(modifiers[modifiers.indexOf('border') + 1])
    }

    if (modifiers.includes('debounce') && config.interactive) {
        config.interactiveDebounce = parseInt(modifiers[modifiers.indexOf('debounce') + 1])
    }

    if (modifiers.includes('max-width')) {
        config.maxWidth = parseInt(modifiers[modifiers.indexOf('max-width') + 1])
    }

    if (modifiers.includes('theme')) {
        config.theme = modifiers[modifiers.indexOf('theme') + 1]
    }

    if (modifiers.includes('placement')) {
        config.placement = modifiers[modifiers.indexOf('placement') + 1]
    }

    return config
}
