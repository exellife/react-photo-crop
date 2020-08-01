import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const plugin = [
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
    // {
    //     input: 'src/static/index.js',
    //     cache: false,
    //     plugins: plugin,
    //     output: {
    //         file: 'dist/static/react-photo-crop.js',
    //         format: 'umd',
    //         name: 'ReactPhotoCrop',
    //     },
    //     watch: {
    //         include: [
    //             'src/static/**/*.[tj]s?(x)',
    //             '!src/static/__trash/**/*.[tj]s?(x)',
    //         ],
    //     }
    // },
    {
        input: 'src/static/dev.jsx',
        cache: false,
        plugins: plugin,
        external: ['ReactPhotoCrop'],
        output: {
            file: 'dist/static/dev.js',
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