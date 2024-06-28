import React from 'react';
import "./Footer.scss";
import logo from "../../../Assets/Images/dark-logo.png";
import { FaFacebook, FaLinkedin, FaSkype } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';


const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className='contact_us'>
                                <div className="logo"><img src={logo} alt="logo" /></div>
                                <h5>Call Us</h5>
                                <h4>800 388 80 90</h4>
                                <p>C 208, Phase 8B, Industrial Area, Sector 74 </p>
                                <a href="https://antiersolutions.com/contact/contact-us.php">antiersolutions.com</a>
                                <div className='social_icons'>
                                    <a href="https://twitter.com" className='twitter' aria-label="Twitter"><FaTwitter /></a>
                                    <a href="https://skype.com" className='' aria-label="Skype"><FaSkype /></a>
                                    <a href="https://youtube.com" className='youtube' aria-label="YouTube"><IoLogoYoutube /></a>
                                    <a href="https://www.facebook.com" className='' aria-label="Facebook"><FaFacebook /></a>
                                    <a href="https://www.linkedin.com" className='linked_in' aria-label="LinkedIn"><FaLinkedin /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className='more_info'>
                                        <h1>About</h1>
                                        <ul>
                                            <li><NavLink to="/about">About Us</NavLink></li>
                                            <li><NavLink to="/courses">Courses</NavLink></li>
                                            <li><NavLink to="/instructor">Instructor</NavLink></li>
                                            <li><NavLink to="/events">Events</NavLink></li>
                                            <li><NavLink to="/become-teacher">Become A Teacher</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='more_info'>
                                        <h1>Links</h1>
                                        <ul>
                                            <li><NavLink to="/news-blogs">News & Blogs</NavLink></li>
                                            <li><NavLink to="/library">Library</NavLink></li>
                                            <li><NavLink to="/gallery">Gallery</NavLink></li>
                                            <li><NavLink to="/partners">Partners</NavLink></li>
                                            <li><NavLink to="/career">Career</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='more_info'>
                                        <h1>Support</h1>
                                        <ul>
                                            <li><NavLink to="/documentation">Documentation</NavLink></li>
                                            <li><NavLink to="/faqs">FAQs</NavLink></li>
                                            <li><NavLink to="/forum">Forum</NavLink></li>
                                            <li><NavLink to="/sitemap">Sitemap</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
