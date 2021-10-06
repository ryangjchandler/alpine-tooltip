import tippy from 'tippy.js'
import { buildConfigFromModifiers } from './buildConfigFromModifiers'

export default function (Alpine) {
    Alpine.directive('tooltip', (el, { modifiers, expression }, { evaluateLater, effect }) => {
        const getContent = evaluateLater(expression)
        const config = modifiers.length > 0
            ? buildConfigFromModifiers(modifiers)
            : {}

        effect(() => {
            getContent(content => {
                if (!el.__x_tippy) {
                    el.__x_tippy = tippy(el, config)
                }

                el.__x_tippy.setContent(content)
            })
        })
    })
}
