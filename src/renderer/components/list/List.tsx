import { useMemo } from 'react';
import { getBrands } from '../../services/BrandService';
import Brand from '../brand/Brand';
import { BrandModel } from '../../models/BrandModel';
import './List.scss';

type Props = {
  path: string;
};

export default function List({ path }: Props) {
  const brands = useMemo(() => {
    if (!path) {
      return [];
    }
    console.log('path', path);
    return getBrands(path);
  }, [path]);

  return (
    <>
      <div className="list-header">
        <h2>Brands</h2>
        <div className="header-buttons">
          <button type="button">Add brand</button>
          <button type="button">Edit schema</button>
        </div>
      </div>
      {brands && brands.length > 0 && (
        <ul className="list">
          {brands.map((brand: BrandModel) => {
            return <Brand key={brand.name} brand={brand} />;
          })}
        </ul>
      )}
    </>
  );
}
