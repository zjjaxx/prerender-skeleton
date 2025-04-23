import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/skeleton.ts',"src/index.ts"],
  sourcemap: true,
  clean: true,
  dts:true,
  target:"es5",
  format:['iife',"cjs","esm"]
})