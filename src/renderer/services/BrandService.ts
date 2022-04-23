import { BrandModel } from '../models/BrandModel';

export function readBrand(
  brandName: string,
  DIRECTORY_PATH: string
): BrandModel {
  const brandPath = `${DIRECTORY_PATH}\\${brandName}`;
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

export function getBrands(DIRECTORY_PATH: string): BrandModel[] {
  let brands = [];
  if (DIRECTORY_PATH) {
    try {
      brands = window.electron.fs.readdirSync(DIRECTORY_PATH);
    } catch (e) {
      alert(e);
    }
    return brands.map((brand: string) => {
      return readBrand(brand, DIRECTORY_PATH);
    });
  }
  return [];
}

export function saveBrand(
  DIRECTORY_PATH: string,
  newBrand: BrandModel,
  oldBrand: BrandModel
) {
  // overwrite logo
  if (oldBrand.logoPath !== newBrand.logoPath) {
    window.electron.fs.writeFileSync(
      `${DIRECTORY_PATH}\\${newBrand.name}\\icon.png`,
      window.electron.fs.readFileSync(newBrand.logoPath)
    );
  }

  // overwrite directory name
  if (oldBrand.name !== newBrand.name) {
    window.electron.fs.renameSync(
      `${DIRECTORY_PATH}\\${oldBrand.name}`,
      `${DIRECTORY_PATH}\\${newBrand.name}`
    );
  }

  // overwrite json
  window.electron.fs.writeFileSync(
    `${DIRECTORY_PATH}\\${newBrand.name}\\config.json`,
    JSON.stringify(newBrand.json),
    'utf8'
  );
}

export function deleteBrand(DIRECTORY_PATH: string, brand: BrandModel) {
  window.electron.fs.rmSync(`${DIRECTORY_PATH}\\${brand.name}`, {
    recursive: true,
    force: true,
  });
}
