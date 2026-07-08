import { describe, it, expect } from 'vitest';
import { average, clamp } from './math';

describe('average', () => {
  it('computes the mean of a list of numbers', () => {
    expect(average([2, 4, 6])).toBe(4);
  });

  it('returns 0 for an empty list', () => {
    expect(average([])).toBe(0);
  });
});

describe('clamp', () => {
  it('clamps a value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
