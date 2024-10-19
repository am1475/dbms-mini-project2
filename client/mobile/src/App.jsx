import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features"; // Corrected the import name
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import LandingPage from "./components/Landingpage";
import Update from "./components/Update";
import Delete from "./components/Delete";


const App = () => {
  return (
    <Router>
      <div className="text-center text-2xl">
        <Navbar />

        <Routes>
          {/* Route for the signup page */}
          <Route path="/signup" element={
            <>
            <Signup />
          <Footer />
            </>
          } />

          <Route path="/login" element={
            <>
            <Login />
          <Footer />
            </>
          } />
          <Route path="/update" element={
            <>
            <Update />
          <Footer />
            </>
          } />

            <Route path="/delete" element={
            <>
            <Delete />
          <Footer />
            </>
          } />




          <Route path="/landing" element={
            <>
            <LandingPage />
          <Footer />
            </>
          } />
          




          {/* Route for the root path */}
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Testimonials />
              <About />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
