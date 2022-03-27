export interface BrandModel {
  id: number;
  name: string;
  welcomeText: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  features: FeaturesModel;
}

export interface FeaturesModel {
  fundraiser: boolean;
  tickets: boolean;
  membership: boolean;
  limitFundraisers: boolean;
}
