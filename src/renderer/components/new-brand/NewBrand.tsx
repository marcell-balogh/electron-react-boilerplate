import '../brand-details/BrandDetails.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert, Button, Collapse, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { updateBrand } from 'renderer/redux/BrandSlice';
import { BrandModel } from '../../models/BrandModel';

export default function NewBrand() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newBrand, setNewBrand] = useState<BrandModel>({
    id: NaN,
    name: '',
    logoPath: '',
    json: {},
  });

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
    if (newBrand) {
      // saveBrand(path, newBrand, brand);
      dispatch(updateBrand(newBrand));
      showAlert('Brand updated successfully!');
    }
  };

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
        <h1 className="header-part">New Brand</h1>
        <div className="options">
          <Button
            onClick={() => update()}
            startIcon={<SaveIcon />}
            variant="contained"
            color="warning"
          >
            Save
          </Button>
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
        margin="normal"
        onChange={(e) => setNewBrand({ ...newBrand, id: +e.target.value })}
      />
      <TextField
        required
        id="outlined-required"
        label="Name"
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
      <TextField
        required
        id="outlined-required"
        label="json"
        margin="normal"
        multiline
        rows={10}
        maxRows="infinity"
      />
    </>
  );
}
