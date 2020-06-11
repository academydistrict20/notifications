import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/asd20-notifications-ui.esm.js',
        plugins: [],
      },
      {
        format: 'esm',
        file: 'dist/asd20-notifications-ui.esm.min.js',
        plugins: [terser()],
      },
    ],
    plugins: [
      vue({
        css: true,
        template: { isProduction: true },
      }),
      css(),
      commonjs(),
      resolve(),
      babel({ babelHelpers: 'runtime' }),
      visualizer({ gzipSize: true, brotliSize: true, json: true }),
    ],
    external: ['vue', '@babel/runtime'],
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/asd20-notifications-ui.ssr.js',
    },
    plugins: [vue({ css: true, template: { optimizeSSR: true, isProduction: true } }), css(), resolve()],
    external: ['vue'],
  },
  // Browser build.
  {
    input: 'src/wrapper.js',
    output: [
      {
        format: 'iife',
        file: 'dist/asd20-notifications-ui.js',
        name: 'Asd20NotificationsUi',
        sourcemap: false,
        globals: {
          vue: 'Vue',
        },
      },
      {
        format: 'iife',
        file: 'dist/asd20-notifications-ui.min.js',
        name: 'Asd20NotificationsUi',
        sourcemap: false,
        globals: {
          vue: 'Vue',
        },
        plugins: [terser()],
      },
    ],
    plugins: [vue({ css: false, template: { isProduction: true } }), css(), resolve()],
    external: ['vue'],
  },
  // Browser compatability build.
  {
    input: 'src/wrapper.js',
    output: [
      {
        format: 'iife',
        file: 'dist/asd20-notifications-ui.compat.js',
        name: 'Asd20NotificationsUi',
        sourcemap: false,
        globals: {
          vue: 'Vue',
        },
      },
      {
        format: 'iife',
        file: 'dist/asd20-notifications-ui.compat.min.js',
        name: 'Asd20NotificationsUi',
        sourcemap: true,
        globals: {
          vue: 'Vue',
        },
        plugins: [terser()],
      },
    ],
    plugins: [
      vue({ css: true, template: { isProduction: true } }),
      css(),
      commonjs(),
      resolve(),
      babel({ babelHelpers: 'runtime' }),
    ],
    external: ['vue', '@babel/runtime'],
  },
  // Web Component Build
  {
    input: 'src/web-component-wrapper.js',
    output: [
      {
        format: 'umd',
        file: 'dist/asd20-notifications-ui.web-components.umd.js',
        sourcemap: false,
        globals: { vue: 'Vue' },
      },
      {
        format: 'umd',
        file: 'dist/asd20-notifications-ui.web-components.umd.min.js',
        sourcemap: true,
        globals: { vue: 'Vue' },
        plugins: [terser()],
      },
    ],
    plugins: [vue({ isWebComponent: true, template: { isProduction: true } }), css(), resolve()],
    external: ['vue', 'vue-runtime-helpers'],
  },
]
