import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Store } from 'renderer/redux/BrandSlice';
import Brand from '../brand/Brand';
import './List.scss';
import { BrandModel } from '../../models/BrandModel';

export default function List() {
  const navigate = useNavigate();
  const brands = useSelector((state: Store) => state.brands);

  return (
    <>
      <div className="list-header">
        <h2>Brands ({brands?.length})</h2>
        <div className="header-buttons">
          <Button
            onClick={() => navigate(`/new-brand/`)}
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add brand
          </Button>
          <Button startIcon={<EditIcon />} variant="contained">
            Edit schema
          </Button>
        </div>
      </div>
      <div className="list">
        {brands && brands.length > 0 && (
          <Grid container spacing={2}>
            {brands.map((brand: BrandModel) => {
              return <Brand key={brand.name} brand={brand} />;
            })}
          </Grid>
        )}
      </div>
    </>
  );
}
