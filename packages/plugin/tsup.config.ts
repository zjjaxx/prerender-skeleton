import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts',"src/renderComplate.ts"],
  sourcemap: true,
  clean: true,
  dts:true,
  target:"es2020",
  shims: true,
  format:['esm',"cjs"]
})