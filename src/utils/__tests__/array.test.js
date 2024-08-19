import { mergeSortedArray } from '../array';

describe('mergeSortedArray', () => {
  it('should merge and maintain order of sortedPart while keeping original items', () => {
    const originalArray = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
      { id: 4, value: 'four' },
    ];

    const sortedPart = [
      { id: 3, value: 'three' },
      { id: 1, value: 'one' },
    ];

    const result = mergeSortedArray(originalArray, sortedPart, 'id');

    expect(result).toEqual([
      { id: 3, value: 'three' },
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 4, value: 'four' },
    ]);
  });

  it('should return the original array if sortedPart is empty', () => {
    const originalArray = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
    ];

    const sortedPart = [];

    const result = mergeSortedArray(originalArray, sortedPart, 'id');

    expect(result).toEqual(originalArray);
  });

  it('should return only sortedPart if originalArray is empty', () => {
    const originalArray = [];

    const sortedPart = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
    ];

    const result = mergeSortedArray(originalArray, sortedPart, 'id');

    expect(result).toEqual(sortedPart);
  });

  it('should handle custom idPath correctly', () => {
    const originalArray = [
      { customId: 1, value: 'one' },
      { customId: 2, value: 'two' },
      { customId: 3, value: 'three' },
    ];

    const sortedPart = [
      { customId: 3, value: 'three' },
      { customId: 1, value: 'one' },
    ];

    const result = mergeSortedArray(originalArray, sortedPart, 'customId');

    expect(result).toEqual([
      { customId: 3, value: 'three' },
      { customId: 1, value: 'one' },
      { customId: 2, value: 'two' },
    ]);
  });

  it('should not mutate the original array', () => {
    const originalArray = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
    ];

    const sortedPart = [
      { id: 3, value: 'three' },
      { id: 1, value: 'one' },
    ];

    const originalArrayCopy = [...originalArray];

    mergeSortedArray(originalArray, sortedPart, 'id');

    expect(originalArray).toEqual(originalArrayCopy);
  });
});
