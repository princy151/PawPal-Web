import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './home.tsx';
import LoginPetSitter from './login_PetSitter.tsx';
import LoginPetOwner from './login_petowner.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-pet-sitter" element={<LoginPetSitter />} />
        <Route path="/login-pet-owner" element={<LoginPetOwner />} />
      </Routes>
    </Router>
  );
};

export default App;
