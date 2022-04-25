import './BrandDetails.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Collapse, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ReactJson from 'react-json-view';
import { Store, updateBrand } from 'renderer/redux/BrandSlice';
import { BrandModel } from '../../models/BrandModel';
import { saveBrand } from '../../services/BrandService';
import DeleteDialog from '../dialog/DeleteDialog';

export default function BrandDetails() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((store: Store) => store.brands);
  const path = useSelector((store: Store) => store.directoryPath);
  const { id } = useParams();
  const brand = brands.find(
    (brandModel: BrandModel) => brandModel.id === Number(id)
  );
  const [newBrand, setNewBrand] = useState<BrandModel>(
    brand || {
      id: NaN,
      name: '',
      logoPath: '',
      json: {},
    }
  );

  const openFile = async () => {
    setNewBrand({
      ...newBrand,
      logoPath: await window.electron.selectFile(),
    });
  };

  const showAlert = (alertMessage: string) => {
    setMessage(alertMessage);
    setOpen(true);
  };

  const update = () => {
    if (brand && newBrand) {
      setNewBrand({
        ...newBrand,
        logoPath: brand.logoPath,
      });
      dispatch(
        updateBrand({
          oldBrand: brand,
          newBrand,
        })
      );
      showAlert('Brand updated successfully!');
    }
  };

  return (
    <>
      {newBrand && (
        <>
          <div className="header">
            <Button
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
              variant="contained"
            >
              Back
            </Button>
            <h1 className="header-part">{newBrand.name}</h1>
            <div className="options">
              <Button
                onClick={() => update()}
                startIcon={<SaveIcon />}
                variant="contained"
                color="warning"
              >
                Save
              </Button>
              <DeleteDialog brandId={brand?.id} />
            </div>
          </div>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>
          <TextField
            required
            id="outlined-required"
            label="Id"
            defaultValue={newBrand.id}
            margin="normal"
            onChange={(e) => setNewBrand({ ...newBrand, id: +e.target.value })}
          />
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue={newBrand.name}
            margin="normal"
            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
          />
          <div className="select-file">
            <TextField
              className="input"
              id="outlined-basic"
              label="Logo path"
              variant="outlined"
              value={newBrand.logoPath}
              margin="normal"
              onChange={(e) =>
                setNewBrand({ ...newBrand, logoPath: e.target.value })
              }
            />
            <Button
              className="button"
              color="secondary"
              variant="contained"
              startIcon={<FolderIcon />}
              onClick={openFile}
            >
              Browse File
            </Button>
          </div>
          <div className="json">
            <ReactJson
              src={newBrand.json}
              displayDataTypes={false}
              onEdit={(e) => setNewBrand({ ...newBrand, json: e.updated_src })}
            />
          </div>
        </>
      )}
    </>
  );
}
