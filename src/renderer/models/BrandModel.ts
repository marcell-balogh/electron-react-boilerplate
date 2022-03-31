export interface BrandModel {
  id: number;
  name: string;
  welcomeText: string;
  logoPath: string;
  theme: {
    scheme: string;
    primaryColor: string;
    secondaryColor: string;
  };
  features: {
    fundraiser: boolean;
    tickets: boolean;
    membership: boolean;
    limitFundraisers: boolean;
  };
}
