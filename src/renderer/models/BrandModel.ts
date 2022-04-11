export interface BrandModel {
  id: number;
  name: string;
  logoPath: string;
  json: any;
}

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;
