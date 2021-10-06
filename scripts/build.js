import fs from 'fs';
import brotliSize from 'brotli-size'
import esbuild from 'esbuild'

(() => {
    if (! fs.existsSync(`./dist`)) {
        fs.mkdirSync(`./dist`, 0o744);
    }

    // Go through each file in the package's "build" directory
    // and use the appropriate bundling strategy based on its name.
    fs.readdirSync(`./builds`).forEach(file => {
        bundleFile(file)
    });
})()

function bundleFile(file) {
    // Based on the filename, give esbuild a specific configuration to build.
    ({
        // This output file is meant to be loaded in a browser's <script> tag.
        'cdn.js': () => {
            build({
                entryPoints: [`builds/${file}`],
                outfile: `dist/${file}`,
                bundle: true,
                platform: 'browser',
                define: { CDN: true },
            })

            // Build a minified version.
            build({
                entryPoints: [`builds/${file}`],
                outfile: `dist/${file.replace('.js', '.min.js')}`,
                bundle: true,
                minify: true,
                platform: 'browser',
                define: { CDN: true },
            }).then(() => {
                outputSize('tooltip', `dist/${file.replace('.js', '.min.js')}`)
            })

        },

        'module.js': () => {
            build({
                entryPoints: [`builds/${file}`],
                outfile: `dist/${file.replace('.js', '.esm.js')}`,
                bundle: true,
                platform: 'neutral',
                mainFields: ['main', 'module'],
            })

            build({
                entryPoints: [`builds/${file}`],
                outfile: `dist/${file.replace('.js', '.cjs.js')}`,
                bundle: true,
                target: ['node10.4'],
                platform: 'node',
            })
        },
    })[file]()
}

function build(options) {
    options.define || (options.define = {})
    options.define['process.env.NODE_ENV'] = process.argv.includes('--production') ? `'production'` : `'development'`

    return esbuild.build({
        watch: process.argv.includes('--watch'),
        ...options,
    }).catch(() => process.exit(1))
}

function outputSize(pkg, file) {
    let size = bytesToSize(brotliSize.sync(fs.readFileSync(file)))

    console.log("\x1b[32m", `${pkg}: ${size}`)
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }
