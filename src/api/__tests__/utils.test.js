import { buildHeaders } from '../utils';

describe('buildHeaders', () => {
  it('should return default headers when no params and options are provided', () => {
    const result = buildHeaders();
    expect(result).toEqual({});
  });

  it('should include Content-Type and cache-control headers when options.body is true', () => {
    const options = { body: true };
    const result = buildHeaders({}, options);

    expect(result).toEqual({
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    });
  });

  it('should include Authorization header when token is provided in params', () => {
    const params = { token: 'abc123' };
    const result = buildHeaders(params);

    expect(result).toEqual({
      Authorization: 'abc123',
    });
  });

  it('should include both body headers and Authorization header when both are provided', () => {
    const params = { token: 'abc123' };
    const options = { body: true };
    const result = buildHeaders(params, options);

    expect(result).toEqual({
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization: 'abc123',
    });
  });

  it('should return empty headers when no body and token are provided', () => {
    const result = buildHeaders({}, { body: false });
    expect(result).toEqual({});
  });
});

