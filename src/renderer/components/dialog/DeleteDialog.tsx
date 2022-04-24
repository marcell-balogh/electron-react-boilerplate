import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeBrand, Store } from 'renderer/redux/BrandSlice';
import { deleteBrand } from '../../services/BrandService';
import { BrandModel } from '../../models/BrandModel';

export default function DeleteDialog(props: { brandId: number | undefined }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const brands = useSelector((state: Store) => state.brands);
  const path = useSelector((state: Store) => state.directoryPath);
  const brand = brands.find(
    (brandModel: BrandModel) => brandModel.id === Number(props.brandId)
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleYes = () => {
    if (brand) {
      deleteBrand(path, brand);
      dispatch(removeBrand(brand.id));
      setOpen(false);
      navigate('/');
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        variant="contained"
        color="error"
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete the [{brand?.name}] brand?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
