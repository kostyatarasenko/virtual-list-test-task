export type APIParams = {
  token?: string;
  [key: string]: string | number | boolean | undefined;
}

export type APIOptions = {
  body?: boolean;
  [key: string]: boolean | string | undefined;
}
