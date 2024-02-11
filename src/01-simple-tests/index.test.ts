import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 2;
    const b = 3;
    const action = Action.Add;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const a = 8;
    const b = 3;
    const action = Action.Subtract;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const a = 8;
    const b = 7;
    const action = Action.Multiply;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const a = 21;
    const b = 7;
    const action = Action.Divide;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const a = 2;
    const b = 3;
    const action = Action.Exponentiate;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    const a = 2;
    const b = 3;
    const action = null;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const a = null;
    const b = 3;
    const action = Action.Add;
    const result: number | null = simpleCalculator({ a, b, action });
    expect(result).toBeNull();
  });
});
