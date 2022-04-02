import './BrandDetails.scss';
import { useParams } from 'react-router-dom';

export default function BrandDetails() {
  const brand = useParams();
  return (
    <>
      <h1>{brand.name}</h1>
    </>
  );
}
