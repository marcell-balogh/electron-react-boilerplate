import '../brand-details/BrandDetails.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { HexColorPicker, HexColorInput } from 'react-colorful';
import JSONInput from 'react-json-editor-ajrm';
import { addBrand, Store } from 'renderer/redux/BrandSlice';
import { JsonValues } from 'renderer/models/JsonValues';
import { BrandModel } from '../../models/BrandModel';

export default function NewBrand() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const templateJson = useSelector((state: Store) => state.templateJson);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newBrand, setNewBrand] = useState<BrandModel>({
    id: NaN,
    name: '',
    logoPath: '',
    json: templateJson,
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    scheme: 'primary',
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
        onChange={(e) => {
          const newJson = {
            default: {
              ...newBrand.json.default,
              clubId: +e.target.value,
            },
          };
          setNewBrand({
            ...newBrand,
            id: +e.target.value,
            json: newJson,
          });
        }}
      />
      <TextField
        required
        id="outlined-required"
        label="Name"
        margin="normal"
        onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
      />
      <div className="img">
        <div className="logo">
          {newBrand.logoPath && (
            <img src={`file://${newBrand.logoPath}`} alt={newBrand.name} />
          )}
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
            style={{
              borderLeft: `1rem solid ${newBrand?.primaryColor}`,
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
              style={{
                borderLeft: `1rem solid ${newBrand?.secondaryColor}`,
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
                checked={newBrand.features.tickets}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      tickets: e.target.checked,
                    },
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
                checked={newBrand.features.membership}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      membership: e.target.checked,
                    },
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
                checked={newBrand.features.limitFundraisers}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    features: {
                      ...newBrand.features,
                      limitFundraisers: e.target.checked,
                    },
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
      <InputLabel>Json</InputLabel>
      <JSONInput
        theme="light_mitsuketa_tribute"
        placeholder={newBrand.json}
        width="100%"
        onChange={(json: JsonValues) =>
          setNewBrand({ ...newBrand, json: json.jsObject })
        }
      />
    </>
  );
}
