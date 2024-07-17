import React from "react";
import {Link} from "react-router-dom";
import './Footer.css'
import { FaGoogle ,FaFacebook,FaTwitter} from "react-icons/fa6";

function Footer() {
    return (<div className="footerParentDiv">
    <div className="content">
      <div>
        <div className="heading">
          <p>POPULAR LOCATIONS</p>
        </div>
        <div className="list">
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="heading">
          <p>ABOUT US</p>
        </div>
        <div className="list">
          <ul>
            <li>About CTZ Group</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="heading">
          <p>CTZ</p>
        </div>
        <div className="list">
          <ul>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="heading">
          <p>Follow US</p>
        </div>
        <div className="list">
          <ul>
            <li><FaGoogle/></li>
            <li><FaFacebook/></li>
            <li><FaTwitter/></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer">
      <p>Free Classifieds in India. © 2006-2021 CTZ</p>
    </div>
  </div>)
}
export default Footer;