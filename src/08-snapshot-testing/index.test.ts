import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };
    expect(generateLinkedList([1, 2, 3])).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3])).toMatchSnapshot();
  });
});
