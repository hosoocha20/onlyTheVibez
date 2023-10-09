import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Do from "./Do";
import About from "./About";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<Do />} />
        <Route path="about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
