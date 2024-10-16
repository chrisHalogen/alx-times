import React from "react";
import { Footer, Header, Hero } from "../../components";
import { Link } from "react-router-dom";
import "./about.scss";

function About() {
  return (
    <div className="about-page">
      <Header />
      <Hero
        imageBGurl="/assets/about-hero-img.jpg"
        title={"About Us"}
        // subtitle={`Search Term: ${searchTerm}`}
      />
      <div className="page-content-container">
        <div className="page-content">
          <p>
            <strong>ALX Times</strong> is a dynamic project designed to keep
            users informed, organized, and connected. Built with a focus on
            performance and usability, it delivers seamless access to the latest
            information while maintaining simplicity. This platform is the
            culmination of months of learning, dedication, and hands-on
            experience in the ALX Software Engineering Program. It embodies the
            principles of practical software development, teamwork, and
            problem-solving - all of which were key pillars throughout the
            journey.
          </p>
          <br />
          <h2>A Capstone Project by Christian Chi and Amanda Nxumalo</h2>
          <br />
          <p>
            <strong>ALX Times</strong> stands as the final project for two
            passionate software engineers,{" "}
            <Link to={"https://github.com/chrishalogen"}>Christian Chi</Link>{" "}
            and <Link to={"https://github.com/mooreArrqs"}>Amanda Nxumalo</Link>{" "}
            . Drawing from the comprehensive training provided by the ALX
            Software Engineering program, they designed and developed this
            platform to showcase their skills and creativity. This project not
            only demonstrates their proficiency with modern web technologies but
            also highlights their ability to collaborate effectively. It is a
            testament to the knowledge and hands-on experience acquired
            throughout the ALX journey.
            <br />
            <br />
            At <strong>ALX Times</strong>, the goal is simple:
            <strong>To empower people with timely information. </strong>
            We hope you enjoy exploring the platform as much as we enjoyed
            building it!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
