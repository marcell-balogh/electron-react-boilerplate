// Get all brands
import { BrandModel } from '../models/BrandModel';

export function getBrands(PROJECT_PATH: string): BrandModel[] {
  let brands = [];
  let id = 0;
  if (PROJECT_PATH) {
    brands = window.electron.fs.readdirSync(PROJECT_PATH);
    const brandModels = brands.map((brand: string) => {
      const brandModel = {
        id,
        name: brand,
      };
      id += 1;
      return brandModel;
    });
    console.log('yesss', brandModels);
    return brandModels;
  }
  console.log('noooo', []);
  return [];
}
