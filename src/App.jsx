import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { MovieProvider } from './contexts/MovieContext';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;