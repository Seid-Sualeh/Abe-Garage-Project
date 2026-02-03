import React from "react";
import PageTitle from "../../../components/OtherComponents/PageTitle/PageTitle";
import Appointment from "../../../components/OtherComponents/CTA/Appointment"

function Contact() {
  return (
    <>
      <PageTitle title="Contact" pageName="Contact Us" />
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <section
          className="map-section"
          style={{ flex: "1 1 350px", minWidth: "300px", marginTop: "30px" }}
        >
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m22!1m8!1m3!1d46184.72607378241!2d-79.4371786!3d43.6576261!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d43.6457645!2d-79.403533!4m5!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!3m2!1d43.653226!2d-79.3831843!5e0!3m2!1sen!2set!4v1752955323128!5m2!1sen!2set"
              width="100%"
              height="350"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section
          className="contact-section"
          style={{ flex: "1 1 350px", minWidth: "300px" }}
        >
          <div className="auto-container">
            <div className="row clearfix">
              <div className="info-column col-lg-12">
                <div className="inner-column">
                  <h4>Our Address</h4>
                  <div className="text">
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service.
                  </div>
                  <ul>
                    <li>
                      <i className="flaticon-pin"></i>
                      <span>Address:</span>141 Bathurst St #129, Toronto, ON M5V
                      2R2, Canada
                    </li>
                    <li>
                      <i className="flaticon-email"></i>
                      <span>email:</span> contact@abeAutorex.com
                    </li>
                    <li>
                      <i className="flaticon-phone"></i>
                      <span>phone:</span> 1800 456 7890 / 1254 897 3654
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Appointment />
    </>
  );
}

export default Contact;
