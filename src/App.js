import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="login" element={<Login />} />
        <Route path="todos" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
