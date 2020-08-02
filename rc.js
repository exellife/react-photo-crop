const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const babel = require('@rollup/plugin-babel').babel;
const terser = require('rollup-plugin-terser').terser;
const rollup = require('rollup');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');


const plugin_minify = [
    peerDepsExternal(),
    nodeResolve({
        browser: true,
        extenstions: ['.js', '.jsx'],
    }),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        plugins: [],
    }),
    terser(),
];

const plugin_ = [
    peerDepsExternal(),
    nodeResolve({
        browser: true,
        extenstions: ['.js', '.jsx'],
    }),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        plugins: [],
    }),
];

const inputOptions = [
    {
        input: 'src/static/index.js',
        plugins: plugin_minify,
    },
    {
        input: 'src/static/index.js',
        plugins: plugin_,
    },
    {
        input: 'src/static/index.js',
        plugins: plugin_minify,
    },
    {
        input: 'src/static/index.js',
        plugins: plugin_,
    },
];

const outputOptions = [
    {
        file: 'dist/umd/react-photo-crop.min.js',
        format: 'umd',
        name: 'ReactPhotoCrop',
        globals: ['React']
    },
    {
        file: 'dist/umd/react-photo-crop.js',
        format: 'umd',
        name: 'ReactPhotoCrop',
        globals: ['React'],
    },
    {
        file: 'dist/cjs/react-photo-crop.min.js',
        format: 'cjs',
        globals: ['React'],
    },
    {
        file: 'dist/cjs/react-photo-crop.js',
        format: 'cjs',
        globals: ['React'],
    },
]

async function build() {
    for (let i = 0; i < 4; i++) {
        const bundle_min = await rollup.rollup(inputOptions[i]);
        await bundle_min.generate(outputOptions[i]);
        await bundle_min.write(outputOptions[i]);
    }
}

build();