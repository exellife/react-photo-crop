import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const plugin = [
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

export default [
    {
        input: 'src/static/index.js',
        cache: false,
        plugins: plugin,
        output: {
            file: 'dev/static/react-photo-crop.js',
            format: 'umd',
            name: 'ReactPhotoCrop',
        },
        watch: {
            include: [
                'src/static/**/*.[tj]s?(x)',
                '!src/static/__trash/**/*.[tj]s?(x)',
            ],
        }
    },
    {
        input: 'src/static/dev.jsx',
        cache: false,
        plugins: plugin,
        external: ['ReactPhotoCrop'],
        output: {
            file: 'dev/static/dev.js',
            format: 'umd',
            name: 'test',
            globals: {
                ReactPhotoCrop: 'ReactPhotoCrop',
            },
        },
        watch: {
            include: [
                'src/static/**/*.[tj]s?(x)',
                '!src/static/__trash/**/*.[tj]s?(x)',
            ],
        }
    },
]