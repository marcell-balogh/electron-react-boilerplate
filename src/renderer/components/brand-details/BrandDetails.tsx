import './BrandDetails.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import ReactJson from 'react-json-view';
import { BrandModel } from '../../models/BrandModel';
import { Store } from '../../redux/Store';
import { saveBrand } from '../../services/BrandService';

export default function BrandDetails() {
  const navigate = useNavigate();
  const brands = useSelector((state: Store) => state.brands);
  const path = useSelector((state: Store) => state.directoryPath);
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

  const dispatch = useDispatch();
  const updateBrand = () => {
    if (brand && newBrand) {
      console.log('updateiiing');
      dispatch({
        type: 'UPDATE_BRAND',
        payload: {
          ...brand,
          ...newBrand,
        },
      });
      saveBrand(path, newBrand, brand);
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
            <Button
              onClick={() => updateBrand()}
              startIcon={<SaveIcon />}
              variant="contained"
              color="warning"
            >
              Save
            </Button>
          </div>
          <TextField
            required
            id="outlined-required"
            label="Id"
            defaultValue={newBrand.id}
            margin="normal"
            onChange={(e) => setNewBrand({ ...newBrand, id: e.target.value })}
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
