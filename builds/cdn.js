import Tooltip from '../src/index'

document.addEventListener('alpine:initializing', () => {
    Tooltip(window.Alpine)
})
