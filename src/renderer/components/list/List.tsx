import { useSelector } from 'react-redux';
import Brand from '../brand/Brand';
import { BrandModel } from '../../models/BrandModel';
import './List.scss';

export default function List() {
  const brands: BrandModel[] = useSelector((state: BrandModel[]) => state);
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
