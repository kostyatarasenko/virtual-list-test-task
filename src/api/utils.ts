import { API_ENDPOINT } from './constants';
import { HeaderParams, RequestParams } from './types';

const getApiEndpoint = (url: string) => {
  return `${API_ENDPOINT}${url}`;
};

const buildHeaders = (options?: HeaderParams): HeadersInit => {
  const headers: HeadersInit = {};

  if (options?.body) {
    headers['Content-Type'] = 'application/json';
    headers['cache-control'] = 'no-cache';
  }

  if (options?.token) {
    headers.Authorization = `${options.token}`;
  }

  return headers;
};

const buildURLSearchParams = (params?: RequestParams): string => {
  return new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>),
  ).toString();
};

export {
  getApiEndpoint,
  buildHeaders,
  buildURLSearchParams,
};
