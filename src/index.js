import tippy from 'tippy.js'
import { buildConfigFromModifiers } from './buildConfigFromModifiers'

export default function (Alpine) {
    Alpine.magic('tooltip', el => {
        return (content, config = {}) => {
            const onHiddenCallback = config.hasOwnProperty('onHidden') ?
                function (instance) {
                    // The lifecycle hooks do not seem to care about the return
                    // value of this hook. We will hijack it, and if it returns
                    // false we will not destroy the instance.
                    if (config.onHidden(instance) !== false)
                        instance.destroy()
                } : function (instance) {
                    instance.destroy()
                }

            // Since delay doesn't do anything
            // when we spawn it programatically,  
            // we can use it to control the duration 
            // of the tooltip.
            const delay = (config.delay == null)
                ? 300
                : (Array.isArray(config.delay))
                    ? config.delay[0] + config.delay[1]
                    : (Number.isInteger(config.delay))
                        ? config.delay
                        : 300

            const instance = tippy(el, {
                content,
                trigger: 'manual',
                ...config,
                onHidden: onHiddenCallback,
                delay
            })

            instance.show()

            setTimeout(() => instance.hide(), delay)
        }
    })

    Alpine.directive('tooltip', (el, {modifiers, expression}, {evaluateLater, effect}) => {
        const config = modifiers.length > 0
            ? buildConfigFromModifiers(modifiers)
            : {}

        if (!el.__x_tippy) {
            el.__x_tippy = tippy(el, config)
        }

        const enableTooltip = () => el.__x_tippy.enable();
        const disableTooltip = () => el.__x_tippy.disable();

        const setupTooltip = (content) => {
            if (!content) {
                disableTooltip()
            } else {
                enableTooltip()

                el.__x_tippy.setContent(content)
            }
        }

        if (modifiers.includes('raw')) {
            setupTooltip(expression)
        } else {
            const getContent = evaluateLater(expression)

            effect(() => {
                getContent(content => {
                    if (typeof content === 'object') {
                        el.__x_tippy.setProps(content)
                        enableTooltip()
                    } else {
                        setupTooltip(content)
                    }
                })
            })
        }
    })
}
