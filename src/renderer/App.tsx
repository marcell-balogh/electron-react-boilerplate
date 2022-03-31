import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Component } from 'react';
import List from './components/list/List';
import { Select } from './components/select/Select';

const Welcome = () => {
  return (
    <div>
      <h1>Brand Manager</h1>
      <p>
        Hello there! This is a white-label brand manager made for the Clubspot
        application. To start open the brands folder inside the project
        directory.
      </p>
    </div>
  );
};

type Props = {
  props: any;
};

type State = {
  directoryPath: string;
};

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      directoryPath: '',
    };
    this.setPath = this.setPath.bind(this);
  }

  setPath(path: string) {
    this.setState({
      directoryPath: path,
    });
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Welcome />
                <Select
                  path={this.state.directoryPath}
                  setPath={this.setPath}
                />
                <div className="divider" />
                <List path={this.state.directoryPath} />
              </>
            }
          />
        </Routes>
      </Router>
    );
  }
}
