import { Component } from 'react';
import { BrandService } from '../../services/BrandService';
import { BrandModel } from '../../models/BrandModel';

export class List extends Component {
  brandService: BrandService = new BrandService(
    'D:/WORK/zoosh/clubspot/clubspot/packages/mobile/brands/'
  );

  brands: BrandModel[] = this.brandService.getBrands();

  render() {
    return <h1>Test</h1>;
  }
}
