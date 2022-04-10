import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './Brand.scss';

type Props = {
  brand: any;
};

export default function Brand(props: Props) {
  const navigate = useNavigate();
  const { brand } = props;
  console.log(brand);
  const primary = {
    fill: brand.default.theme.primary,
  };
  const secondary = {
    fill: brand.default.theme.secondary,
  };
  return (
    <Grid item xs={6}>
      <div className="brand">
        <div className="brand-logo">
          <img
            src="https://via.placeholder.com/80"
            alt={brand.default.suffix}
          />
        </div>
        <div className="brand-content">
          <h3 id={brand.default.clubId.toString()} className="brand-title">
            {brand.default.suffix}
          </h3>
          <p className="brand-theme">Schema: {brand.default.theme.scheme}</p>
          <p className="brand-theme">
            <svg width="12" height="12">
              <rect width="12" height="12" style={primary} />
            </svg>{' '}
            - Primary color {brand.default.theme.primaryColor}
          </p>
          {brand.default.theme.scheme === 'primary' && (
            <p className="brand-theme">
              <svg width="12" height="12">
                <rect width="12" height="12" style={secondary} />
              </svg>{' '}
              - Secondary color {brand.default.theme.secondaryColor}
            </p>
          )}
        </div>
        <div className="brand-buttons">
          <Button
            onClick={() => navigate(`/brand/${brand.default.clubId}`)}
            size="small"
            color="info"
            startIcon={<EditIcon />}
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={() => navigate(`/brand/${brand.default.clubId}`)}
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </div>
    </Grid>
  );
}
