// tests/helloWorld.test.ts
/// <reference types="vite/client" />
import { describe, it, expect } from 'vitest';
import { helloWorld } from '../src/index';

describe('helloWorld function', () => {
  it('should return "Hello, World!"', () => {
    const result = helloWorld();
    expect(result).toBe('Hello, World!');
  });
});