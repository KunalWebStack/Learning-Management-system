import React, { useState } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterButtonClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <>
      <div className="meain_navbar">
        <div className="container">
          <div className="header_top">
            <div className="header_top_left">
              <ul>
                <li>
                  <Link>
                    <FontAwesomeIcon icon={faPhone} />
                    <span className="contact_no">(+88) 1990 6886</span>
                  </Link>
                </li>
                <li className="line_li">
                  <span className="line"></span>
                </li>
                <li>
                  <Link>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className="contact_no">agency@example.com</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="header_top_right">
              <ul className="nav_btn">
                {loggedInUser.token ? (
                  <>
                    <li>
                      <div className="line"></div>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Login
                        handleRegisterButtonClick={handleRegisterButtonClick}
                        show={showLoginModal}
                        handleShow={handleLoginButtonClick}
                        handleClose={handleCloseLoginModal}
                      />
                    </li>
                    <li>
                      <div className="line"></div>
                    </li>
                    <li>
                      <Signup
                        handleLoginButtonClick={handleLoginButtonClick}
                        show={showRegisterModal}
                        handleClose={handleCloseRegisterModal}
                      />
                    </li>
                  </>
                )}
              </ul>
                
              <ul className="social-links">
                <li>
                  <a href="https://twitter.com/" aria-label="Twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/" aria-label="Facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
