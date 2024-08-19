import { getApiEndpoint, buildHeaders, buildURLSearchParams } from './utils';
import { RequestParams } from './types';

const getData = (url: string, params?: RequestParams): Promise<Response> => {
  const headers = buildHeaders(params, { body: false });

  const payloadParams = buildURLSearchParams(params);

  return fetch(getApiEndpoint(`${url}?${payloadParams}`), {
    method: 'GET',
    headers,
  });
};

const patchData = <T extends Record<string, unknown>>(
  url: string,
  data: T,
  params?: RequestParams,
): Promise<Response> => {
  const headers = buildHeaders(params, { body: true });

  return fetch(getApiEndpoint(url), {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers,
  });
};

const putData = <T extends Record<string, unknown>>(
  url: string,
  data: T,
  params?: RequestParams,
): Promise<Response> => {
  const headers = buildHeaders(params, { body: true });

  return fetch(getApiEndpoint(url), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
  });
};

const postData = <T extends Record<string, unknown>>(
  url: string,
  data: T,
  params?: RequestParams,
): Promise<Response> => {
  const headers = buildHeaders(params, { body: true });

  return fetch(getApiEndpoint(url), {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });
};

const deleteData = async (url: string, params?: RequestParams): Promise<Response> => {
  const headers = buildHeaders(params);

  return fetch(getApiEndpoint(url), {
    method: 'DELETE',
    headers,
  });
};

export {
  getData,
  patchData,
  putData,
  postData,
  deleteData,
};
