import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import { Button } from '@mui/material';
import { BrandModel } from '../../models/BrandModel';
import { getBrands } from '../../services/BrandService';
import { Store } from '../../redux/Store';

export default function Select() {
  const path = useSelector((state: Store) => state.directoryPath);
  const dispatch = useDispatch();

  const setBrands = (brands: BrandModel[]) => {
    dispatch({
      type: 'SET_BRANDS',
      payload: brands,
    });
  };

  const setPath = (directoryPath: string) => {
    dispatch({
      type: 'SET_PATH',
      payload: directoryPath,
    });
  };

  const openDirectory = async () => {
    const filePath = await window.electron.selectFolder();
    const filePathElement = document.getElementById('path');
    if (filePathElement) {
      filePathElement.innerText = filePath;
    }
    setBrands(getBrands(filePath));
    setPath(filePath);
    console.log(filePath);
  };

  return (
    <div className="select">
      <Button
        className="select-button"
        onClick={openDirectory}
        startIcon={<FolderIcon />}
        variant="contained"
      >
        Open Directory
      </Button>
      <p className="path">
        Path: <span id="path">{path}</span>
      </p>
    </div>
  );
}
