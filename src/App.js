import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/AuthPage'; 
import PersonalSpacePage from './pages/PersonalSpacePage';
import RequestsPage from './pages/RequestsPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Auth />} />
        <Route path="/personal-space" element={<PersonalSpacePage />} /> 
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
