import './BrandDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ReactJson from 'react-json-view';

export default function BrandDetails() {
  const navigate = useNavigate();
  const brands = useSelector((state: any[]) => state);
  const { id } = useParams();
  const brand = brands.find((brandModel: any) => brandModel.id === Number(id));
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
        {brand && <h1 className="header-part">{brand.name}</h1>}
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
  );
}
