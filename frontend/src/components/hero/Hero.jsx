import React from "react";
import "./hero.scss";

function Hero({ imageBGurl, title, subtitle }) {
  //   const imageBGurl = `${process.env.PUBLIC_URL}${imageBGurl}`;

  return (
    <div
      className="hero-area"
      style={{
        backgroundImage: `url(${`${process.env.PUBLIC_URL}${imageBGurl}`})`,
      }}
    >
      <div className="overlay"></div>
      <div className="inner">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

export default Hero;
