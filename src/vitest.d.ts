/// <reference types="@testing-library/jest-dom/vitest" />

import type { AxeMatchers } from 'vitest-axe/matchers';

declare module 'vitest' {
  // Declaration merge: members come from `AxeMatchers` only.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Vitest `Assertion` merge
  interface Assertion<_T = unknown> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Vitest asymmetric matchers merge
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
