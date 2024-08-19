import { getData, postData, putData, patchData, deleteData } from './core';

import { HeaderParams, RequestParams } from './types';

// This file is the entry point for the API module.
// You can configure other request functions that return promises and replace them only here.
const api = {
  get: <T extends RequestParams>(url: string, data?: T, params?: HeaderParams) => getData(url, data, params),
  post: <T extends RequestParams>(url: string, data: T, params?: HeaderParams) => postData(url, data, params),
  put: <T extends RequestParams>(url: string, data: T, params?: HeaderParams) => putData(url, data, params),
  patch: <T extends RequestParams>(url: string, data: T, params?: HeaderParams) => patchData(url, data, params),
  delete: (url: string, params?: HeaderParams) => deleteData(url, params),
} as const;

export default api;
