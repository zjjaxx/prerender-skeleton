import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/skeleton.ts',"src/index.ts"],
  sourcemap: true,
  clean: true,
  dts:true,
  target:"es5",
  minify:true,
  format:['iife',"cjs","esm"]
})