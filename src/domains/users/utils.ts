import { findIndex as _findIndex } from 'lodash';

import { User } from '../../types';

const getUserItemRealIndex = (
  realData: User[],
  sortedUsers: User[],
  virtualIndex: number,
): number => {
  return _findIndex(realData, { email: sortedUsers[virtualIndex].email });
};

export {
  getUserItemRealIndex,
};
