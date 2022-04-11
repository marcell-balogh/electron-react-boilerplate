import './BrandDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ReactJson from 'react-json-view';
import { BrandModel } from '../../models/BrandModel';
import { Store } from '../../redux/Store';

export default function BrandDetails() {
  const navigate = useNavigate();
  const brands = useSelector((state: Store) => state.brands);
  const { id } = useParams();
  const brand = brands.find(
    (brandModel: BrandModel) => brandModel.id === Number(id)
  );
  return (
    <>
      {brand && (
        <>
          <div className="header">
            <Button
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
              variant="contained"
            >
              Back
            </Button>
            <h1 className="header-part">{brand.name}</h1>
            <Button
              onClick={() => navigate('/')}
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
            defaultValue={brand.id}
            margin="normal"
          />
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue={brand.name}
            margin="normal"
          />
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <TextField
            required
            id="outlined-required"
            label="Logo path"
            defaultValue={brand.logoPath}
            margin="normal"
          />
          <div className="json">
            <ReactJson
              src={brand.json}
              displayDataTypes={false}
              enableClipboard={false}
            />
          </div>
        </>
      )}
    </>
  );
}
