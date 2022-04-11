import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import List from './components/list/List';
import Select from './components/select/Select';
import BrandDetails from './components/brand-details/BrandDetails';

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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Welcome />
              <Select />
              <div className="divider" />
              <List />
            </>
          }
        />
        <Route path="brand">
          <Route path=":id" element={<BrandDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}
