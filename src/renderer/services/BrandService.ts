import { BrandModel } from '../models/BrandModel';

export function createBrand(
  brandName: string,
  PROJECT_PATH: string
): BrandModel {
  const brandPath = `${PROJECT_PATH}\\${brandName}`;
  const logoPath = `${brandPath}\\icon.png`;
  const raw = window.electron.fs.readFileSync(
    `${brandPath}\\config.json`,
    'utf8'
  );
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    alert(e);
  }
  return {
    id: json.default.clubId,
    name: brandName,
    logoPath,
    json,
  };
}

export function getBrands(PROJECT_PATH: string): BrandModel[] {
  let brands = [];
  if (PROJECT_PATH) {
    brands = window.electron.fs.readdirSync(PROJECT_PATH);
    const brandModels = brands.map((brand: string) => {
      return createBrand(brand, PROJECT_PATH);
    });
    console.log('yesss', brandModels);
    return brandModels;
  }
  console.log('noooo', []);
  return [];
}
