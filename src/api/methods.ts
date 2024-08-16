import { getApiEndpoint, buildHeaders } from './utils';
import { APIParams } from './types';

const getJson = async (url: string, params?: APIParams): Promise<Response> => {
  const headers = buildHeaders(params, { body: false });
  const queryStringParams = new URLSearchParams(params as Record<string, string>).toString();

  return fetch(getApiEndpoint(url, queryStringParams), {
    method: 'GET',
    headers,
  });
};

const patchJson = async <T>(url: string, json: T, params?: APIParams): Promise<Response> => {
  const headers = buildHeaders(params, { body: true });

  return fetch(getApiEndpoint(url), {
    method: 'PATCH',
    body: JSON.stringify(json),
    headers,
  });
};

const putJson = async <T>(url: string, json: T, params?: APIParams): Promise<Response> => {
  const headers = buildHeaders(params, { body: true });

  return fetch(getApiEndpoint(url), {
    method: 'PUT',
    body: JSON.stringify(json),
    headers,
  });
};

const postJson = async <T>(url: string, json: T, params?: APIParams): Promise<Response> => {
  const headers = buildHeaders(params, { body: true });

  return fetch(getApiEndpoint(url), {
    method: 'POST',
    body: JSON.stringify(json),
    headers,
  });
};

const deleteJson = async (url: string, params?: APIParams): Promise<Response> => {
  const headers = buildHeaders(params);

  return fetch(getApiEndpoint(url), {
    method: 'DELETE',
    headers,
  });
};

export {
  getJson,
  patchJson,
  putJson,
  postJson,
  deleteJson,
};
