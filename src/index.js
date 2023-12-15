import tippy from "tippy.js";
import { buildConfigFromModifiers } from "./buildConfigFromModifiers";

function Tooltip(Alpine) {
    Alpine.magic("tooltip", (el) => {
        return (content, config = {}) => {
            const timeout = config.timeout;

            delete config.timeout;
            
            const instance = tippy(el, {
                content,
                trigger: "manual",
                ...config,
            });

            instance.show();

            setTimeout(() => {
                instance.hide();

                setTimeout(() => instance.destroy(), config.duration || 300);
            }, timeout || 2000);
        };
    });

    Alpine.directive(
        "tooltip",
        (el, { modifiers, expression }, { evaluateLater, effect }) => {
            const config =
                modifiers.length > 0 ? buildConfigFromModifiers(modifiers) : {};

            if (!el.__x_tippy) {
                el.__x_tippy = tippy(el, config);
            }

            const enableTooltip = () => el.__x_tippy.enable();
            const disableTooltip = () => el.__x_tippy.disable();

            const setupTooltip = (content) => {
                if (!content) {
                    disableTooltip();
                } else {
                    enableTooltip();

                    el.__x_tippy.setContent(content);
                }
            };

            if (modifiers.includes("raw")) {
                setupTooltip(expression);
            } else {
                const getContent = evaluateLater(expression);

                effect(() => {
                    getContent((content) => {
                        if (typeof content === "object") {
                            el.__x_tippy.setProps(content);
                            enableTooltip();
                        } else {
                            setupTooltip(content);
                        }
                    });
                });
            }
        }
    );
}

Tooltip.defaultProps = (props) => {
    tippy.setDefaultProps(props)

    return Tooltip
}

export default Tooltip;
