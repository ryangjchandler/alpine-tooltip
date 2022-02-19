import tippy from 'tippy.js'
import { buildConfigFromModifiers } from './buildConfigFromModifiers'

export default function (Alpine) {
    Alpine.magic('tooltip', (el) => {
        return (content, config = {}) => {
            const instance = tippy(el, {
                content,
                trigger: 'manual',
                ...config
            })

            instance.show()

            setTimeout(() => {
                instance.hide()

                setTimeout(() => instance.destroy(), config.duration || 300)
            }, config.timeout || 2000)
        }
    })

    Alpine.directive('tooltip', (el, { modifiers, expression }, { evaluateLater, effect }) => {
        const config = modifiers.length > 0
            ? buildConfigFromModifiers(modifiers)
            : {}

        if (!el.__x_tippy) {
            el.__x_tippy = tippy(el, config)
        }

        const setupTooltip = (content) => {
            if (!content) {
                el.__x_tippy.disable()
            } else {
                el.__x_tippy.enable()
                el.__x_tippy.setContent(content)
            }
        }

        if (modifiers.includes('raw')) {
            setupTooltip(expression)
        } else {
            const getContent = evaluateLater(expression)

            effect(() => {
                getContent(content => {
                    setupTooltip(content)
                })
            })
        }
    })
}
