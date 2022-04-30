export interface BrandModel {
  id: number;
  name: string;
  logoPath: string;
  scheme: string;
  primaryColor: string;
  secondaryColor: string;
  features: {
    fundraiser: boolean;
    tickets: boolean;
    membership: boolean;
    limitFundraisers: boolean;
  };
  json: any;
}

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;
