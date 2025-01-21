import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import HomePage from './HomePage';
// import LoginPetSitter from './Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPetSitter />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
