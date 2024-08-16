type URLParamValue = string | number | boolean;
type HeaderParamValue = string;

export interface APIParams {
  token?: HeaderParamValue;
  [key: string]: URLParamValue | undefined;
}

export interface APIOptions {
  body?: boolean;
  [key: string]: boolean | HeaderParamValue | undefined;
}
