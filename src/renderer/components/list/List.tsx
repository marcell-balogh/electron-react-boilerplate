import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack } from '@mui/material';
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
          <Button startIcon={<AddIcon />} variant="contained">
            Add brand
          </Button>
          <Button startIcon={<EditIcon />} variant="contained">
            Edit schema
          </Button>
        </div>
      </div>
      {brands && brands.length > 0 && (
        <Stack spacing={2}>
          {brands.map((brand: BrandModel) => {
            return <Brand key={brand.name} brand={brand} />;
          })}
        </Stack>
      )}
    </>
  );
}
