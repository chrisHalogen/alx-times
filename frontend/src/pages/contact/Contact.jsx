import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Footer, Header, Hero } from "../../components";

function Contact() {
  return (
    <div className="about-page">
      <Header />
      <Hero
        imageBGurl="/assets/contact-hero-img.jpg"
        title={"Contact Us"}
        // subtitle={`Search Term: ${searchTerm}`}
      />
      <div className="page-content-container">
        <div className="page-content">
          <p>
            We'd love to hear from you! Whether you have a question, feedback,
            or need support, the ALX Times team is here to help. Get in touch
            with us through any of the channels below:
          </p>
          <br />
          <div className="contact-icons-grid">
            <div className="single-icon">
              <div className="icon-container">
                <FaEnvelope />
              </div>
              <div className="text-content">
                <h3>Email</h3>
                <p>
                  Feel free to reach out to us via email for inquiries or
                  assistance:
                </p>
                <Link to="mailto:info@alxtimes.com">info@alxtimes.com</Link>
              </div>
            </div>
            <div className="single-icon">
              <div className="icon-container">
                <FaPhone />
              </div>
              <div className="text-content">
                <h3>Phone</h3>
                <p>
                  We're just a call away! Reach out to us for quick support or
                  inquiries:
                </p>
                <Link to="tel:+21398017826">+21398017826</Link>
              </div>
            </div>
            <div className="single-icon">
              <div className="icon-container">
                <FaGear />
              </div>
              <div className="text-content">
                <h3>Request</h3>
                <p>
                  Have an idea to improve our platform? We'd love to hear from
                  you:
                </p>
                <Link to="mailto:admin@alxtimes.com">admin@alxtimes.com</Link>
              </div>
            </div>
          </div>
          <br />
          <br />
          <h2>Feedback & Suggestions</h2>
          <p>
            We value your input! If you have any ideas or suggestions to improve
            ALX Time, please let us know through our feedback form or email.
            Thank you for supporting us! We look forward to connecting with you.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
