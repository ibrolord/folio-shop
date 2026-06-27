import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Only run the project's own unit tests. AnnotateQA drops its generated
    // Playwright reproduction under .annotate/reproductions/ and runs it with
    // its own runner, so vitest must not try to load those specs.
    include: ['test/**/*.test.js'],
    exclude: ['node_modules/**', '.annotate/**', 'dist/**'],
  },
});
