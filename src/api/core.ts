import { getApiEndpoint, buildHeaders, buildURLSearchParams } from './utils';
import { HeaderParams, RequestParams } from './types';

const getData = <T extends RequestParams>(url: string, data?: T, options?: HeaderParams): Promise<Response> => {
  const headers = buildHeaders(options);

  const payloadParams = buildURLSearchParams(data);

  return fetch(getApiEndpoint(`${url}?${payloadParams}`), {
    method: 'GET',
    headers,
  });
};

const postData = <T extends RequestParams>(
  url: string,
  data: T,
  options?: HeaderParams,
): Promise<Response> => {
  const headers = buildHeaders(options);

  return fetch(getApiEndpoint(url), {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });
};

const putData = <T extends RequestParams>(
  url: string,
  data: T,
  options?: HeaderParams,
): Promise<Response> => {
  const headers = buildHeaders(options);

  return fetch(getApiEndpoint(url), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
  });
};

const patchData = <T extends RequestParams>(
  url: string,
  data: T,
  options?: HeaderParams,
): Promise<Response> => {
  const headers = buildHeaders(options);

  return fetch(getApiEndpoint(url), {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers,
  });
};

const deleteData = (url: string, options?: HeaderParams): Promise<Response> => {
  const headers = buildHeaders(options);

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
