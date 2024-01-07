> ✨ Help support the maintenance of this package by [sponsoring me](https://github.com/sponsors/ryangjchandler).

# Alpine Tooltip

Add tooltips to your Alpine 3.x components with a custom directive.

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/ryangjchandler/alpine-tooltip?label=version&style=flat-square)
![Build size Brotli](https://img.badgesize.io/ryangjchandler/alpine-tooltip/main/dist/cdn.min.js.svg?compression=gzip&style=flat-square&color=green)
[![Monthly downloads via CDN](https://data.jsdelivr.com/v1/package/npm/@ryangjchandler/alpine-tooltip/badge)](https://www.jsdelivr.com/package/npm/@ryangjchandler/alpine-tooltip)

> This package only supports Alpine v3.x.

## About

This plugin adds a new `x-tooltip` to Alpine, alongside a bunch of modifiers for changing your tooltip's behaviour.

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, just before Alpine.

```html
<script
    src="https://cdn.jsdelivr.net/npm/@ryangjchandler/alpine-tooltip@1.x.x/dist/cdn.min.js"
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

### Raw text

If you don't want to bind your tooltip's content to a data property in your Alpine component, you can add the `.raw` modifier to the directive and set the content using the directive expression instead.

```html
<button x-data x-tooltip.raw="Hello, world!">
    Raw Tooltip
</button>
```

The expression / text inside of the directive will be used as the tooltip and it will only be initialised and configured once.

### Disabling the tooltip

If you wish to disable the tooltip you can set the data property to a falsy value, i.e. an empty string, `null`, `undefined` or `false`. If you wish to re-enable the tooltip, just update the data property to a truthy expression and the plugin will call the `enable()` method on the Tippy instance.

### Modifiers

The `x-tooltip` directive is powered by [Tippy.js](https://atomiks.github.io/tippyjs/). Tippy has a lot of different configuration options, some of which can be controlled via modifiers on the `x-tooltip` directive.

| Modifier      | Description                                                                                                                                                                                                                         | Usage                                                                     |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `duration`    | Change the transition duration (ms) of the toolip.                                                                                                                                                                                  | `x-tooltip.duration.500`                                                  |
| `delay`       | Change the transition delay (ms) of the tooltip.                                                                                                                                                                                    | `x-tooltip.delay.500`<br/>`x-tooltip.delay.500-0`                         |
| `cursor`      | Determines if the tooltip follows the user's cursor.<br>Default behaviour will follow cursor around target element.<br>`x` will follow the cursor horizontally.<br>`initial` will place the cursor at the user's cursor on trigger. | `x-tooltip.cursor`<br>`x-tooltip.cursor.x`<br>`x-tooltip.cursor.initial`  |
| `on`          | Change the trigger event for the tooltip. Default behaviour is `mouseenter` and `focus`.                                                                                                                                            | `x-tooltip.on.click`<br>`x-tooltip.on.focus`<br>`x-tooltip.on.mouseenter` |
| `arrowless`   | Hide the "arrow" on the tooltip.                                                                                                                                                                                                    | `x-tooltip.arrowless`                                                     |
| `html`        | Allow HTML inside of the tooltip.                                                                                                                                                                                                   | `x-tooltip.html`                                                          |
| `interactive` | Allow the user to interact with the tooltip (prevent it from disappearing).                                                                                                                                                         | `x-tooltip.interactive`                                                   |
| `border`      | Change the size of the invisible border (px) around the tooltip that will prevent it from hiding when the cursor leaves it.                                                                                                         | `x-tooltip.interactive.border.30`                                         |
| `debounce`    | Change the time (ms) to debounce the interactive hide handler when the cursor leaves the tooltip.                                                                                                                                   | `x-tooltip.interactive.debounce.500`                                      |
| `max-width`   | Change the `max-width` (px) of the tooltip.                                                                                                                                                                                         | `x-tooltip.max-width.500`                                                 |
| `theme`       | Change the theme of the tooltip. Find out more [here](https://atomiks.github.io/tippyjs/v6/themes/).                                                                                                                                | `x-tooltip.theme.light`                                                   |
| `placement`   | Change the placement / position of the tooltip. Find out more [here](https://atomiks.github.io/tippyjs/v6/all-props/#placement).                                                                                                    | `x-tooltip.placement.top`, `x-tooltip.placement.bottom-start`             |
| `animation`   | Change the animation used for the tooltip. Find out more [here](https://atomiks.github.io/tippyjs/v6/animations/).                                                                                                                  | `x-tooltip.animation.scale`, `x-tooltip.animation.perspective`            |
| `no-flip`     | Disable Popper's default auto-flip behaviour. This allows you to set a placement with `.placement` and always enforce it.                                                                                                           | `x-tooltip.placement.left.no-flip`                                        |

### `$tooltip`

As well as the `x-tooltip` directive, this package also provides a `$tooltip` magic function that you can use to manually instantiate a tooltip.

```html
<button @click="$tooltip('Hello, world!')">
```

When you click on this button, the tooltip will show and be hidden 2 seconds later.

#### Configuring the timeout

If you would like the tooltip to show for longer than 2 seconds, you can provide an object as the second argument to the `$tooltip` magic function.

```html
<button @click="$tooltip('Hello, world!', { timeout: 5000 })">
```

The timeout should be in milliseconds (`seconds * 1000`). 

#### Tippy configuration

The second argument to `$tooltip` should be an object. This object accepts all Tippy.js configuration options, found in the [docs](https://atomiks.github.io/tippyjs/v6/all-props/). 

The magic variable will automatically set the `content` property to the value of the first argument, as well as the `trigger` property (`manual`). You're free to specify any other properties supported by Tippy.

```html
<button @click="$tooltip('Hello, world!', { delay: 500 })">
```

### Using another element for content

This package allows you to provide a raw configuration object for Tippy. This means you can use an HTML element to render the tooltip's content:

```html
<div x-data="{ message: 'Hello, world!' }">
    <template x-ref="template">
        <p x-text="message"></p>
    </template>

    <button x-tooltip="{
        content: () => $refs.template.innerHTML,
        allowHTML: true,
        appendTo: $root
    }">
        Show message!
    </button>
</div>
```

There's a couple of things going on here:

1. We provide a callback to the `content` property which will be invoked before Tippy renders the tooltip. This allows us to use dynamic HTML content as the content inside of the tooltip. 
2. We tell Tippy to `allowHTML`. By default, the HTML will be rendered as plain text.
3. Tippy will append the actual tooltip element to the `document.body` by default. Since our `<template>` contains Alpine directives, placing those outside of our actual Alpine component will result in errors. To fix this, Tippy will instead append the element to the `$root` element which is the element where our Alpine component starts (a `<div>` in this case). This allows us to use Alpine directives inside of our template for data binding, etc.

> **Note** If you wish to use buttons or other interactive elements inside of your content, you should add `interactive: true` to the object.

## Setting default Tippy properties

Instead of using the same modifiers or configuration objects across all uses of `$tooltip` and `x-tooltip`, you can instead define a set of default properties that you'd like Tippy to use.

This can be done when importing and registering the plugin.

```js
import Tooltip from '@ryangjchandler/alpine-tooltip'

Alpine.plugin(
    Tooltip.defaultProps({
        delay: 50,
        theme: 'dark',
        // ...
    })
)
```

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) 2021 Ryan Chandler and contributors

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
