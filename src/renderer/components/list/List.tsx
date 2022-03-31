import { useMemo } from 'react';
import { getBrands } from '../../services/BrandService';
import Brand from '../brand/Brand';
import { BrandModel } from '../../models/BrandModel';

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
      <h2>Brands</h2>
      {brands && brands.length > 0 && (
        <ul>
          {brands.map((brand: BrandModel) => {
            return <Brand key={brand.name} brand={brand} />;
          })}
        </ul>
      )}
    </>
  );
}
