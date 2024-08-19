import { API_ENDPOINT } from './constants';
import {RequestParams, URLParams} from './types';

const getApiEndpoint = (url: string) => {
  return `${API_ENDPOINT}${url}`;
};

type BuildHeadersOptions = {
  body: boolean;
};

const buildHeaders = (params?: RequestParams, options?: BuildHeadersOptions): HeadersInit => {
  const headers: HeadersInit = {};

  if (options?.body) {
    headers['Content-Type'] = 'application/json';
    headers['cache-control'] = 'no-cache';
  }

  if (params?.token) {
    headers.Authorization = `${params.token}`;
  }

  return headers;
};

const buildURLSearchParams = (params?: RequestParams): string => {
  return new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key as keyof URLParams] = String(value);
      }
      return acc;
    }, {} as Record<keyof URLParams, string>)
  ).toString();
};

export {
  getApiEndpoint,
  buildHeaders,
  buildURLSearchParams,
};
