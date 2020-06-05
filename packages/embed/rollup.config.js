import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default {
  input: 'src/index.ts', // Path relative to package.json
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es', // the preferred format
      external: ['vue'],
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'Asd20NotificationsEmbed', // the global which can be used in a browser
      globals: {
        vue: 'Vue',
      },
    },
  ],
  // external: ['vue'],
  // external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    typescript({
      typescript: require('typescript'),
      outDir: 'dist',
    }),
    resolve(),
  ],
  external: ['vue'],
}
