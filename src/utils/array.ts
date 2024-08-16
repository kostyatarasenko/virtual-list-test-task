import { get as _get } from 'lodash';

const mergeSortedArray = <T>(
  originalArray: T[],
  sortedPart: T[],
  idPath: string
): T[] => {
  const sortedIds = new Set(sortedPart.map(item => _get(item, idPath)));

  const remainingItems = originalArray.filter(
    item => !sortedIds.has(_get(item, idPath))
  );

  return [...sortedPart, ...remainingItems];
};

export {
  mergeSortedArray,
};
