import { getData, postData, putData, patchData, deleteData } from './core';

// This file is the entry point for the API module.
// You can configure other request functions that return promises and replace them only here.
const api = {
  get: getData,
  post: postData,
  put: putData,
  patch: patchData,
  delete: deleteData,
} as const;

export default api;
