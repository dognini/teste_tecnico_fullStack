import './index.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import FillsPage from './pages/FillsPage'
import FieldsPage from './pages/FieldsPage'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="container mx-auto px-4 py-3">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  Campos
                </Link>
              </li>
              <li>
                <Link to="/preenchimentos" className="text-blue-600 hover:text-blue-800 font-medium">
                  Preenchimentos
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<FieldsPage />} />
            <Route path="/preenchimentos" element={<FillsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;