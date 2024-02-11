import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 5;
    const result = resolveValue(value);
    await expect(result).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Error';
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const err = MyAwesomeError;
    expect(() => throwCustomError()).toThrow(err);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const err = MyAwesomeError;
    await expect(() => rejectCustomError()).rejects.toThrow(err);
  });
});
