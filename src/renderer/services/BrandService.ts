import { BrandModel } from '../models/BrandModel';

export class BrandService {
  private PROJECT_PATH: string = '';

  constructor(path: string) {
    this.PROJECT_PATH = path;
  }

  // Get all brands
  getBrands(): BrandModel[] {
    const brands: BrandModel[] = [];
    window.electron.fs.readdir(this.PROJECT_PATH, (_err: any, files: any[]) => {
      files.forEach((file) => {
        brands.push(this.getBrand(file));
      });
    });
    return brands;
  }

  getBrand(file: any): BrandModel {
    let brand: BrandModel = {} as BrandModel;
    window.electron.fs.readFile(
      this.PROJECT_PATH + file,
      'utf8',
      (_err: any, data: any) => {
        brand = JSON.parse(data);
        console.log(brand);
      }
    );
    return brand;
  }
}

export default BrandService;
