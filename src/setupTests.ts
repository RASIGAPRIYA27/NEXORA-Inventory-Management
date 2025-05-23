
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Automatically run cleanup after each test
afterEach(() => {
  cleanup();
});

// Extend Vitest's expect interface with Jest DOM matchers
declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {
    toBeInTheDocument(): T;
    toHaveTextContent(text: string): T;
  }
}
