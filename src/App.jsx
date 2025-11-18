import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import SubmitBook from './pages/SubmitBook';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            📚 二手书广场
          </Link>
          <div className="nav-links">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              首页
            </Link>
            <Link 
              to="/submit" 
              className={location.pathname === '/submit' ? 'nav-link active' : 'nav-link'}
            >
              发布二手书
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/submit" element={<SubmitBook />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;