import React from "react";
import Home from "./Home";
import About from "./About";

const LandingPage = () => {
    return (
        <div className="App">
          <Home />
          <About id="about-section"/>
        </div>
    );
};

export default LandingPage
