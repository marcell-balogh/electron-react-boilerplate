/* eslint-disable import/prefer-default-export */
export class BrandService {
  private PROJECT_PATH: string = '';

  constructor(path: string) {
    this.PROJECT_PATH = path;
  }

  // Get all brands
  getBrands() {
    window.electron.fs.readdir(this.PROJECT_PATH, (err: any, files: any[]) => {
      files.forEach((file) => {
        console.log(file);
      });
    });
  }
}
