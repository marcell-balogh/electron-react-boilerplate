import './BrandDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BrandModel } from '../../models/BrandModel';

export default function BrandDetails() {
  const navigate = useNavigate();
  const brands = useSelector((state: BrandModel[]) => state);
  const { id } = useParams();
  const brand = brands.find(
    (brandModel: BrandModel) => brandModel.id === Number(id)
  );
  return (
    <>
      {brand && <h1>{brand.name}</h1>}
      <button type="button" onClick={() => navigate('/')}>
        Bacc
      </button>
    </>
  );
}
