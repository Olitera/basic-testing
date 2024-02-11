import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const relativePath = '/';
    const spy = jest.spyOn(axios, 'create');
    throttledGetDataFromApi(relativePath);

    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    //Not implemented
  });

  test('should return response data', async () => {
    //Not implemented
  });
});
