> ✨ Help support the maintenance of this package by [sponsoring me](https://github.com/sponsors/ryangjchandler).

# Alpine Tooltip

Add tooltips to your Alpine 3.x components with a custom directive.

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/ryangjchandler/alpine-tooltip?label=version&style=flat-square)
![Build size Brotli](https://img.badgesize.io/ryangjchandler/alpine-tooltip/main/dist/cdn.js.svg?compression=gzip&style=flat-square&color=green)
[![Monthly downloads via CDN](https://data.jsdelivr.com/v1/package/npm/@ryangjchandler/alpine-tooltip/badge)](https://www.jsdelivr.com/package/npm/@ryangjchandler/alpine-tooltip)

> This package only supports Alpine v3.x.

## About

This plugin adds a new `x-tooltip` to Alpine, alongside a bunch of modifiers for changing your tooltip's behaviour.

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, just before Alpine.

```html
<script
    src="https://cdn.jsdelivr.net/npm/@ryangjchandler/alpine-tooltip@0.x.x/dist/cdn.min.js"
    defer
></script>
```

### NPM

```bash
npm install @ryangjchandler/alpine-tooltip
```

Add the `x-tooltip` directive to your project by registering the plugin with Alpine.

```js
import Alpine from "alpinejs";
import Tooltip from "@ryangjchandler/alpine-tooltip";

Alpine.plugin(Tooltip);

window.Alpine = Alpine;
window.Alpine.start();
```

### CSS

You will also need to include the following CSS in your document:

```html
<link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
```

## Usage

To create a tooltip, use the `x-tooltip` directive on an element.

```html
<div x-data="{ tooltip: 'This is crazy!' }">
    <button x-tooltip="tooltip">Hover for info!</button>
</div>
```

### Modifiers

The `x-tooltip` directive is powered by [Tippy.js](https://atomiks.github.io/tippyjs/). Tippy has a lot of different configuration options, some of which can be controlled via modifiers on the `x-tooltip` directive.

| Modifier      | Description                                                                                                                                                                                                                         | Usage                                                                     |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `duration`    | Change the transition duration (ms) of the toolip.                                                                                                                                                                                  | `x-tooltip.duration.500`                                                  |
| `delay`       | Change the transition delay (ms) of the tooltip.                                                                                                                                                                                    | `x-tooltip.delay.500`                                                     |
| `cursor`      | Determines if the tooltip follows the user's cursor.<br>Default behaviour will follow cursor around target element.<br>`x` will follow the cursor horizontally.<br>`initial` will place the cursor at the user's cursor on trigger. | `x-tooltip.cursor`<br>`x-tooltip.cursor.x`<br>`x-tooltip.cursor.initial`  |
| `on`          | Change the trigger event for the tooltip. Default behaviour is `mouseenter` and `focus`.                                                                                                                                            | `x-tooltip.on.click`<br>`x-tooltip.on.focus`<br>`x-tooltip.on.mouseenter` |
| `arrowless`   | Hide the "arrow" on the tooltip.                                                                                                                                                                                                    | `x-tooltip.arrowless`                                                     |
| `html`        | Allow HTML inside of the tooltip.                                                                                                                                                                                                   | `x-tooltip.html`                                                          |
| `interactive` | Allow the user to interact with the tooltip (prevent it from disappearing).                                                                                                                                                         | `x-tooltip.interactive`                                                   |
| `border`      | Change the size of the invisible border (px) around the tooltip that will prevent it from hiding when the cursor leaves it.                                                                                                         | `x-tooltip.interactive.border.30`                                         |
| `debounce`    | Change the time (ms) to debounce the interactive hide handler when the cursor leaves the tooltip.                                                                                                                                   | `x-tooltip.interactive.debounce.500`                                      |
| `max-width`   | Change the `max-width` (px) of the tooltip.                                                                                                                                                                                         | `x-tooltip.max-width.500`                                                 |
| `theme`       | Change the theme of the tooltip. Find out more [here](https://atomiks.github.io/tippyjs/v6/themes/).                                                                                                                                | `x-tooltip.theme.light`                                                   |

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) 2021 Ryan Chandler and contributors

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
