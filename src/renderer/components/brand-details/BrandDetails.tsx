import './BrandDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
      <div className="header">
        <Button
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back
        </Button>
        {brand && <h1 className="header-part">{brand.name}</h1>}
        <div className="header-part" />
      </div>
      <div className="details">
        {brand && (
          <ul>
            <li>
              <span>id: </span>
              <span>{brand.id}</span>
            </li>
            <li>
              <span>Name: </span>
              <span>{brand.name}</span>
            </li>
            <li>
              <span>Welcome text: </span>
              <span>{brand.welcomeText}</span>
            </li>
            <li>
              <span>Logo path: </span>
              <span>{brand.logoPath}</span>
            </li>
            <li>
              <span>theme: </span>
              <ul>
                <li>
                  <span>scheme: </span>
                  <span>{brand.theme.scheme}</span>
                </li>
                <li>
                  <span>primary: </span>
                  <span>{brand.theme.primaryColor}</span>
                </li>
                <li>
                  <span>secondary: </span>
                  <span>{brand.theme.secondaryColor}</span>
                </li>
              </ul>
            </li>
            <li>
              <span>features: </span>
              <ul>
                <li>
                  <span>fundraiser: </span>
                  <span>{brand.features.fundraiser}</span>
                </li>
                <li>
                  <span>limit fundraisers: </span>
                  <span>{brand.features.limitFundraisers}</span>
                </li>
                <li>
                  <span>membership: </span>
                  <span>{brand.features.membership}</span>
                </li>
                <li>
                  <span>tickets: </span>
                  <span>{brand.features.tickets}</span>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
