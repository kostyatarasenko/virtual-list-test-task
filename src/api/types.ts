export interface URLParams {
  page?: number,
  results?: number,
}

export interface HeaderParams {
  token?: string;
  body?: string;
}

export interface RequestParams extends URLParams, HeaderParams {}
