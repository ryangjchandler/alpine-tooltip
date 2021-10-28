import { followCursor } from 'tippy.js'
import { buildConfigFromModifiers } from '../src/buildConfigFromModifiers'

test('animation', () => {
    expect(buildConfigFromModifiers(['animation', 'shrink'])).toStrictEqual({
        plugins: [],
        animation: 'shrink',
    })
})

test('duration', () => {
    expect(buildConfigFromModifiers(['duration', '500'])).toStrictEqual({
        plugins: [],
        duration: 500,
    })
})

test('delay', () => {
    expect(buildConfigFromModifiers(['delay', '500'])).toStrictEqual({
        plugins: [],
        delay: 500,
    })
})

test('delay - combined', () => {
    expect(buildConfigFromModifiers(['delay', '500-0'])).toStrictEqual({
        plugins: [],
        delay: [500, 0],
    })
})

test('cursor', () => {
    expect(buildConfigFromModifiers(['cursor'])).toStrictEqual({
        plugins: [followCursor],
        followCursor: true,
    })
})

test('cursor - x', () => {
    expect(buildConfigFromModifiers(['cursor', 'x'])).toStrictEqual({
        plugins: [followCursor],
        followCursor: 'horizontal',
    })
})

test('cursor - initial', () => {
    expect(buildConfigFromModifiers(['cursor', 'initial'])).toStrictEqual({
        plugins: [followCursor],
        followCursor: 'initial',
    })
})

test('on', () => {
    expect(buildConfigFromModifiers(['on', 'click'])).toStrictEqual({
        plugins: [],
        trigger: 'click',
    })
})

test('arrowless', () => {
    expect(buildConfigFromModifiers(['arrowless'])).toStrictEqual({
        plugins: [],
        arrow: false,
    })
})

test('html', () => {
    expect(buildConfigFromModifiers(['html'])).toStrictEqual({
        plugins: [],
        allowHTML: true,
    })
})

test('interactive', () => {
    expect(buildConfigFromModifiers(['interactive'])).toStrictEqual({
        plugins: [],
        interactive: true,
    })
})

test('border', () => {
    expect(buildConfigFromModifiers(['interactive', 'border', '30'])).toStrictEqual({
        plugins: [],
        interactive: true,
        interactiveBorder: 30,
    })
})

test('debounce', () => {
    expect(buildConfigFromModifiers(['interactive', 'debounce', '500'])).toStrictEqual({
        plugins: [],
        interactive: true,
        interactiveDebounce: 500,
    })
})

test('max-width', () => {
    expect(buildConfigFromModifiers(['max-width', '500'])).toStrictEqual({
        plugins: [],
        maxWidth: 500,
    })
})

test('theme', () => {
    expect(buildConfigFromModifiers(['theme', 'light'])).toStrictEqual({
        plugins: [],
        theme: 'light',
    })
})

test('placement', () => {
    expect(buildConfigFromModifiers(['placement', 'top'])).toStrictEqual({
        plugins: [],
        placement: 'top',
    })
})
