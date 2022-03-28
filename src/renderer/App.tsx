import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Component } from 'react';

class Select extends Component<any, { value: string }> {
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

const Welcome = () => {
  return (
    <div>
      <h1>Brand Manager</h1>
      <p>
        Hello there! This is a white-label brand manager made for the Clubspot
        application. To start open the brands folder inside the project
        directory.
      </p>
      <Select />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}
