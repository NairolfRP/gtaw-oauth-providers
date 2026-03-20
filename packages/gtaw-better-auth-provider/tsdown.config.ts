import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './build',
  sourcemap: true,
  dts: true,
  format: 'esm',
  target: 'esnext',
  clean: true,
  fixedExtension: false,
})
