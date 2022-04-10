import { Button, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { BrandModel } from '../../models/BrandModel';
import './Brand.scss';

type Props = {
  brand: BrandModel;
};

export default function Brand(props: Props) {
  const navigate = useNavigate();
  const { brand } = props;
  const primary = {
    fill: brand.theme.primaryColor,
  };
  const secondary = {
    fill: brand.theme.secondaryColor,
  };
  return (
    <Paper className="brand">
      <div className="brand-logo">
        <img src={`file://${brand.logoPath}`} alt={brand.name} />
      </div>
      <div className="brand-content">
        <h3 id={brand.id.toString()} className="brand-title">
          {brand.name}
        </h3>
        <p className="brand-theme">Schema: {brand.theme.scheme}</p>
        <p className="brand-theme">
          <svg width="12" height="12">
            <rect width="12" height="12" style={primary} />
          </svg>{' '}
          Primary color: {brand.theme.primaryColor}
        </p>
        {brand.theme.scheme === 'primary' && (
          <p className="brand-theme">
            <svg width="12" height="12">
              <rect width="12" height="12" style={secondary} />
            </svg>{' '}
            Secondary color: {brand.theme.secondaryColor}
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
        <Button
          onClick={() => navigate(`/brand/${brand.id}`)}
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          variant="contained"
        >
          Delete
        </Button>
      </div>
    </Paper>
  );
}
