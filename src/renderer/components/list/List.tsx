import { useDispatch, useSelector } from 'react-redux';
import { selectBrands, set, setByPath } from '../../redux/BrandSlice';
import Brand from '../brand/Brand';
import { BrandModel } from '../../models/BrandModel';
import './List.scss';
import { brandStore } from '../../redux/BrandStore';
import { getBrand } from '../../services/BrandService';

type Props = {
  path: string;
};

export default function List({ path }: Props) {
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  console.log('brands', brands);

  // const brands = useMemo(() => {
  //   if (!path) {
  //     return [];
  //   }
  //   console.log('path', path);
  //   return getBrands(path);
  // }, [path]);

  function getBrands(PROJECT_PATH: string): BrandModel[] {
    let array = [];
    if (PROJECT_PATH) {
      array = window.electron.fs.readdirSync(PROJECT_PATH);
      const brandModels = array.map((brand: string) => {
        return getBrand(brand, PROJECT_PATH);
      });
      console.log('yesss', brandModels);
      dispatch(set(brandModels));
      return brandModels;
    }
    console.log('noooo', []);
    return [];
  }

  getBrands('D:\\WORK\\zoosh\\clubspot\\clubspot\\packages\\mobile\\brands');
  console.log('after init', brandStore.getState());

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
