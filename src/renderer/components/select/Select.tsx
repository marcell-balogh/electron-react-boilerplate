import { Component } from 'react';
import { connect } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import { Button } from '@mui/material';
import { BrandModel } from '../../models/BrandModel';
import { getBrands } from '../../services/BrandService';

class Select extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.openDirectory = this.openDirectory.bind(this);
  }

  async openDirectory() {
    const filePath = await window.electron.selectFolder();
    const filePathElement = document.getElementById('path');
    if (filePathElement) {
      filePathElement.innerText = filePath;
    }
    this.props.set(getBrands(filePath));
    console.log(filePath);
  }

  render() {
    return (
      <div className="select">
        <Button
          className="select-button"
          onClick={this.openDirectory}
          startIcon={<FolderIcon />}
          variant="contained"
        >
          Open Directory
        </Button>
        <p className="path">
          Path: <span id="path" />
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = {
  set: (payload: BrandModel[]) => ({ type: 'SET_BRANDS', payload }),
};

export default connect(null, mapDispatchToProps)(Select);
