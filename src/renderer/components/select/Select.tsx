import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { getBrands } from '../../services/BrandService';
import { Store } from '../../redux/Store';
import './Select.scss';

export default function Select() {
  const [localPath, setLocalPath] = useState('');
  const path = useSelector((state: Store) => state.directoryPath);
  const dispatch = useDispatch();

  const updateStore = (directoryPath: string) => {
    console.log(directoryPath);
    setLocalPath(directoryPath);
    dispatch({ type: 'SET_PATH', payload: directoryPath });
    dispatch({
      type: 'SET_BRANDS',
      payload: getBrands(directoryPath),
    });
  };

  const openDirectory = async () => {
    setLocalPath(await window.electron.selectFolder());
  };

  return (
    <div className="select">
      <div className="select-folder">
        <TextField
          className="input"
          id="outlined-basic"
          placeholder="Paste a folder path, or choose a folder"
          variant="outlined"
          value={path || localPath}
          onChange={(e) => setLocalPath(e.target.value)}
        />
        <Button
          className="button"
          color="secondary"
          variant="contained"
          startIcon={<FolderIcon />}
          onClick={openDirectory}
        >
          Browse folder
        </Button>
      </div>
      <Button
        className="load-button"
        variant="contained"
        onClick={() => updateStore(localPath)}
      >
        Load Brands
      </Button>
    </div>
  );
}
