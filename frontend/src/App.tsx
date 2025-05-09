import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Campos from './pages/Campos'
import Preenchimentos from './pages/Preenchimento'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/campos" element={<Campos />} />
          <Route path="/preenchimentos" element={<Preenchimentos />} />
          <Route path="/" element={<Campos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;