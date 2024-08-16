import { API_ENDPOINT } from './constants';
import { APIOptions, APIParams } from './types';

const getApiEndpoint = (url: string, queryStringParams?: string) => {
  return queryStringParams ? `${API_ENDPOINT}${url}?${queryStringParams}` : `${API_ENDPOINT}${url}`;
};

const buildHeaders = (params: APIParams = {}, options: APIOptions = {}): HeadersInit => {
  const headers: HeadersInit = {};

  if (options.body) {
    headers['Content-Type'] = 'application/json';
    headers['cache-control'] = 'no-cache';
  }

  if (params.token) {
    headers.Authorization = `${params.token}`;
  }

  return headers;
};

export {
  getApiEndpoint,
  buildHeaders,
};
