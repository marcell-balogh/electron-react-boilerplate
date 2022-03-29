import { BrandModel } from '../models/BrandModel';

// Get all brands
export function getBrands(PROJECT_PATH: string): BrandModel[] {
  const brands: BrandModel[] = [];
  let id = 0;
  if (PROJECT_PATH) {
    window.electron.fs.readdir(PROJECT_PATH, (_err: any, files: any[]) => {
      files.forEach((file) => {
        const brand: BrandModel = {
          id,
          name: file,
        };
        brands.push(brand);
        id += 1;
      });
    });
    console.log(brands);
    return brands;
  }
  console.log('noooo', brands);
  return [];
}

//   getBrand(file: any): BrandModel {
//     let brand: BrandModel = {} as BrandModel;
//     window.electron.fs.readFile(
//       this.PROJECT_PATH + file,
//       'utf8',
//       (_err: any, data: any) => {
//         brand = JSON.parse(data);
//         console.log(brand);
//       }
//     );
//     return brand;
//   }
// }
