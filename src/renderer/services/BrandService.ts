import { BrandModel } from '../models/BrandModel';

export function readBrand(
  brandName: string,
  DIRECTORY_PATH: string
): BrandModel | undefined {
  const brandPath = `${DIRECTORY_PATH}\\${brandName}`;
  const logoPath = `${brandPath}\\rn\\logo.png`;
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

  let brand;
  try {
    brand = {
      id: json.default.clubId,
      name: brandName,
      logoPath,
      scheme: json.default.theme.scheme,
      primaryColor: json.default.theme.primary,
      secondaryColor: json.default.theme.secondary,
      json,
      features: {
        fundraiser: json.default.features.fundraiser,
        tickets: json.default.features.tickets,
        membership: json.default.features.membership,
        limitFundraisers: json.default.features.limitFundraisers,
      },
    };
  } catch (e) {
    alert(e);
  }
  return brand;
}

export function getBrands(DIRECTORY_PATH: string): BrandModel[] {
  let brands = [];
  if (DIRECTORY_PATH) {
    try {
      brands = window.electron.fs.readdirSync(DIRECTORY_PATH);
    } catch (e) {
      alert(e);
    }
    return brands.flatMap((brandName: string) => {
      const brand = readBrand(brandName, DIRECTORY_PATH);
      if (brand) {
        return brand;
      }
      return [];
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
      `${DIRECTORY_PATH}\\${oldBrand.name}\\rn\\logo.png`,
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
    JSON.stringify(newBrand.json, null, 2),
    'utf8'
  );
}

export function deleteBrand(DIRECTORY_PATH: string, brand: BrandModel) {
  window.electron.fs.rmSync(`${DIRECTORY_PATH}\\${brand.name}`, {
    recursive: true,
    force: true,
  });
}

export function createBrand(DIRECTORY_PATH: string, brand: BrandModel) {
  // create directory
  const brandPath = `${DIRECTORY_PATH}\\${brand.name}`;
  window.electron.fs.mkdirSync(brandPath);

  // create logo
  window.electron.fs.writeFileSync(
    `${brandPath}\\rn\\logo.png`,
    window.electron.fs.readFileSync(brand.logoPath)
  );

  // create json
  window.electron.fs.writeFileSync(
    `${brandPath}\\config.json`,
    JSON.stringify(brand.json, null, 2),
    'utf8'
  );
}

export function getTemplateJson() {
  const raw = window.electron.fs.readFileSync(
    'src/resources/template.json',
    'utf8'
  );
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    alert(e);
  }
  return json;
}
