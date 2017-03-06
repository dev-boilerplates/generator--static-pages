import Commonjs from 'rollup-plugin-commonjs'
import Resolve from 'rollup-plugin-node-resolve'
import Stringify from 'rollup-plugin-string'
import Buble from 'rollup-plugin-buble'
import Uglify from 'rollup-plugin-uglify'
import eslint from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import { minify } from 'uglify-js'

export default {
    entry: 'js/main.js',
    format: 'iife',
    dest: 'public/bundle.js',
    moduleName: `${process.env.npm_package_name}-wrapper`,
    sourceMap: (process.env.NODE_ENV === 'development'),
    plugins: [
        Resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        Commonjs({
            // include: 'node_modules/**',
        }),
        Stringify({ include: 'js/templates/*.html' }),
        // Babel({
        //     exclude: ['node_modules/**', 'dist/package.js'],
        //     presets: 'es2015-rollup'
        // }),
        Buble({
            transforms: {
                arrow: true,
                modules: false,
                dangerousForOf: true
              },
            file: 'public/bundle.js',
            source: 'js/main.js'
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        (process.env.NODE_ENV === 'production' && Uglify({}, minify))
    ]
}
