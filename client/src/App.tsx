import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Do from './components/Do';
import About from './components/About';
import AnimatedOpener from './components/AnimatedOpener';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <div className="App">
      <AnimatedOpener />
      <Navbar />
      <AnimatedRoutes />
    </div>
  );
}

export default App;
