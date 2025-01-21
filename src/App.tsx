import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './home.tsx';
// import LoginPetSitter from './login.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPetSitter />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
