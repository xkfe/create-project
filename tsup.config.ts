import { defineConfig } from 'tsup'

export default ({ watch }) => (
  defineConfig({
    entry: {
      outfile: 'src/index.ts',
    },
    // format: 'esm', // 'esm', 'cjs', 'iife', 'umd'
    platform: 'node',
    target: 'node18',
    minify: watch ? false : 'terser',
    clean: true,
    // dts: true,
  })
)
