import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { BrandService } from './services/BrandService';

function getBrands() {
  const service: BrandService = new BrandService(
    'D:/WORK/zoosh/clubspot/clubspot/packages/mobile/brands/'
  );
  service.getBrands();
}

const Hello = () => {
  getBrands();
  return (
    <div>
      <h1>White-label Brand Manager</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
