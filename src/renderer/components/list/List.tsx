import './List.scss';

import { Button, Grid } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { brandStore } from 'renderer/redux/Store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Brand from '../brand/Brand';
import { BrandModel } from '../../models/BrandModel';

export default function List() {
  const navigate = useNavigate();
  const brands = useSelector(() => brandStore.getState().brands);

  return (
    <>
      <div className="list-header">
        <h2>Brands ({brands?.length})</h2>
        <div className="header-buttons">
          <Button
            onClick={() => navigate(`/new-brand`)}
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
