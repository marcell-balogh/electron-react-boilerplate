import { Component } from 'react';

export class Select extends Component<any, { value: string }> {
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
    console.log(filePath);
    this.props.setPath(filePath);
  }

  render() {
    return (
      <div className="select">
        <button id="btn" type="button" onClick={this.openDirectory}>
          Open Directory
        </button>
        <p>
          Path: <span id="path" />
        </p>
      </div>
    );
  }
}
