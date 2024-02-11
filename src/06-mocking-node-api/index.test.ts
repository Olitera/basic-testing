import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';
import * as fs from 'fs';
import * as fp from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback,timeout);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, timeout)
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback,timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(spy).toHaveBeenCalled()
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 100;
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, interval)
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalled()
  });
});

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises')

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'index.txt';
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'index.txt'
    const spy = jest.spyOn(fs, 'existsSync');
    spy.mockReturnValue(false)

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(null)
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'index.txt';
    const spy = jest.spyOn(fs, 'existsSync');
    spy.mockReturnValue(true);
    const fileContent = 'Hello'
    const spy2 = jest.spyOn(fp, 'readFile');
    spy2.mockResolvedValue(fileContent)

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent)
  });
});
