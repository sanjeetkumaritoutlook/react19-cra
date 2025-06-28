import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lib/index.ts'], // change this line
  format: ['esm', 'cjs'],
  dts: true, // generates .d.ts
  clean: true,
  external: ['react', 'react-dom'],
});
