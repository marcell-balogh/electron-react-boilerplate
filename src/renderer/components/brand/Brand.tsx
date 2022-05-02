import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import './Brand.scss';
import { BrandModel } from '../../models/BrandModel';
import DeleteDialog from '../dialog/DeleteDialog';

type Props = {
  brand: BrandModel;
};

export default function Brand(props: Props) {
  const navigate = useNavigate();
  const { brand } = props;
  const primary = {
    fill: brand.json.default.theme.primary,
  };
  const secondary = {
    fill: brand.json.default.theme.secondary,
  };
  return (
    <Grid item xs={6}>
      <div className="brand">
        <div className="brand-logo">
          <img
            src={`file://${brand.logoPath}?${Date.now()}`}
            alt={brand.name}
          />
        </div>
        <div className="brand-content">
          <h3 id={brand.id.toString()} className="brand-title">
            {brand.name}
          </h3>
          <p className="brand-theme">
            <div className="brand-scheme">
              {brand.json.default.theme.scheme}
            </div>
          </p>
          <p className="brand-theme">
            <svg width="12" height="12">
              <rect width="12" height="12" style={primary} />
            </svg>{' '}
            {brand.json.default.theme.primary}
          </p>
          {brand.json.default.theme.scheme === 'primary' && (
            <p className="brand-theme">
              <svg width="12" height="12">
                <rect width="12" height="12" style={secondary} />
              </svg>{' '}
              {brand.json.default.theme.secondary}
            </p>
          )}
        </div>
        <div className="brand-buttons">
          <Button
            onClick={() => navigate(`/brand/${brand.id}`)}
            size="small"
            color="info"
            startIcon={<EditIcon />}
            variant="contained"
          >
            Edit
          </Button>
          <DeleteDialog size="small" brandId={brand?.id} />
        </div>
      </div>
    </Grid>
  );
}
