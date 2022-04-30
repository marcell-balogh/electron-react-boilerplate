import '../brand-details/BrandDetails.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { addBrand } from 'renderer/redux/BrandSlice';
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
    primaryColor: '',
    secondaryColor: '',
    scheme: '',
    features: {
      fundraiser: false,
      tickets: false,
      membership: false,
      limitFundraisers: false,
    },
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
      dispatch(addBrand(newBrand));
      showAlert('Brand saved successfully!');
    }
  };

  const setColor = (color: string, mode: string) => {
    if (mode === 'primary') {
      setNewBrand({
        ...newBrand,
        primaryColor: color,
      });
    }
    if (mode === 'secondary') {
      setNewBrand({
        ...newBrand,
        secondaryColor: color,
      });
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
      <div className="color-picker">
        <div className="scheme">
          <InputLabel id="scheme-select-label">Scheme</InputLabel>
          <Select
            labelId="scheme-select-label"
            id="select"
            value={newBrand.scheme}
            label="Scheme"
            onChange={(e) =>
              setNewBrand({
                ...newBrand,
                scheme: e.target.value,
              })
            }
          >
            <MenuItem value="primary">Primary</MenuItem>
            <MenuItem value="secondary">Secondary</MenuItem>
          </Select>
        </div>
        <div className="primary">
          <InputLabel>Primary color</InputLabel>
          <HexColorPicker
            color={newBrand?.primaryColor}
            onChange={(color) => {
              setColor(color, 'primary');
            }}
          />
          <HexColorInput
            color={newBrand?.primaryColor}
            onChange={(color) => {
              setColor(color, 'primary');
            }}
          />
        </div>
        {newBrand.scheme === 'primary' && (
          <div className="secondary">
            <InputLabel>Secondary color</InputLabel>
            <HexColorPicker
              color={newBrand?.secondaryColor}
              onChange={(color) => {
                setColor(color, 'secondary');
              }}
            />
            <HexColorInput
              color={newBrand?.secondaryColor}
              onChange={(color) => {
                setColor(color, 'secondary');
              }}
            />
          </div>
        )}
      </div>
      <div>
        <InputLabel>Features</InputLabel>
        <div className="features">
          <FormControlLabel
            control={
              <Checkbox
                checked={newBrand.features.fundraiser}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      fundraiser: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Fundraiser"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newBrand.features.tickets}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      tickets: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Tickets"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newBrand.features.membership}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      membership: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Membership"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newBrand.features.limitFundraisers}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      limitFundraisers: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Limit Fundraisers"
          />
        </div>
      </div>
      <TextField
        required
        id="outlined-required"
        label="json"
        margin="normal"
        multiline
        rows={10}
        maxRows="infinity"
        onChange={(e) => setNewBrand({ ...newBrand, json: e.target.value })}
      />
    </>
  );
}
