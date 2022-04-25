import './BrandDetails.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import ReactJson from 'react-json-view';
import { Store, updateBrand } from 'renderer/redux/BrandSlice';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { BrandModel } from '../../models/BrandModel';
import DeleteDialog from '../dialog/DeleteDialog';

export default function BrandDetails() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((store: Store) => store.brands);
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
      scheme: '',
      primaryColor: '',
      secondaryColor: '',
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

  const setColor = (color: string, mode: string) => {
    if (mode === 'primary') {
      const newJson = {
        default: {
          ...newBrand.json.default,
          theme: {
            ...newBrand.json.default.theme,
            primary: color,
          },
        },
      };
      setNewBrand({
        ...newBrand,
        primaryColor: color,
        json: newJson,
      });
    }
    if (mode === 'secondary') {
      const newJson = {
        default: {
          ...newBrand.json.default,
          theme: {
            ...newBrand.json.default.theme,
            secondary: color,
          },
        },
      };
      setNewBrand({
        ...newBrand,
        secondaryColor: color,
        json: newJson,
      });
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
            disabled
          />
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue={newBrand.name}
            margin="normal"
            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
          />
          <div className="img">
            <div className="logo">
              <img src={`file://${newBrand.logoPath}`} alt={newBrand.name} />
            </div>
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
          </div>
          <div className="color-picker">
            <div className="scheme">
              <InputLabel id="scheme-select-label">Scheme</InputLabel>
              <Select
                labelId="scheme-select-label"
                id="select"
                value={newBrand.scheme}
                label="Scheme"
                onChange={(e) => {
                  const newJson = {
                    default: {
                      ...newBrand.json.default,
                      theme: {
                        ...newBrand.json.default.theme,
                        scheme: e.target.value,
                      },
                    },
                  };
                  setNewBrand({
                    ...newBrand,
                    scheme: e.target.value,
                    json: newJson,
                  });
                }}
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
                    checked={newBrand.json.default.features.fundraiser}
                    onChange={(e) =>
                      setNewBrand({
                        ...newBrand,
                        json: {
                          default: {
                            ...newBrand.json.default,
                            features: {
                              ...newBrand.json.default.features,
                              fundraiser: e.target.checked,
                            },
                          },
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
                    checked={newBrand.json.default.features.tickets}
                    onChange={(e) =>
                      setNewBrand({
                        ...newBrand,
                        json: {
                          default: {
                            ...newBrand.json.default,
                            features: {
                              ...newBrand.json.default.features,
                              tickets: e.target.checked,
                            },
                          },
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
                    checked={newBrand.json.default.features.membership}
                    onChange={(e) =>
                      setNewBrand({
                        ...newBrand,
                        json: {
                          default: {
                            ...newBrand.json.default,
                            features: {
                              ...newBrand.json.default.features,
                              membership: e.target.checked,
                            },
                          },
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
                    checked={newBrand.json.default.features.limitFundraisers}
                    onChange={(e) =>
                      setNewBrand({
                        ...newBrand,
                        json: {
                          default: {
                            ...newBrand.json.default,
                            features: {
                              ...newBrand.json.default.features,
                              limitFundraisers: e.target.checked,
                            },
                          },
                        },
                      })
                    }
                  />
                }
                label="Limit Fundraisers"
              />
            </div>
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
