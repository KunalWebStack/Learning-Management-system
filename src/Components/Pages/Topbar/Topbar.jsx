import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "./Topbar.scss";
import logo from "../../../Assets/Images/dark-logo.png";
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

 
const Topbar = () => {
    const cartItems = useSelector((state) => state.user.cart);
    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };
    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };
    const handleLoginButtonClick = () => {
        setShowLoginModal(true);
      };
    
      const handleRegisterButtonClick = () => {
        setShowRegisterModal(true);
      };

    
   
    const totalItems = Array.isArray(cartItems) ? cartItems.reduce((totalQuantity, item) => totalQuantity + (item.quantity || 1), 0) : 0;


    return (
 
        <div className="topbar">
        
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} alt="logo" className="logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" >
                        <div className='navbarscroll_inner'>
                            <Nav
                                className=""
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                            </Nav>
                            <Nav className="navbar-nav ml-auto">
                                <div className='links'>
                                    <Nav.Link as={Link} to="/">
                                        Home
                                    </Nav.Link>
                                </div>
                                <div className='links'>
                                    <Nav.Link as={Link} to="/courses">
                                        Courses
                                    </Nav.Link>
                                </div>

                                <div className='links'>
                                    <Link to="/OfflineCourses" className='nav-link'>Offline Courses</Link>
                                </div>

                                <div className='links'>
                                    <Link to="/mycourses" className='nav-link'>MyCourses</Link>
                                </div>
                               
                                <div className='links'>
                                    <Link to="/quiz" className='nav-link'>Quiz</Link>
                                </div>
                               
                                <Link to="/my_profile" className='cart_icon my_profile' >
                                    <FaUserCircle />
                                </Link>

                                <Link to="/cartitems" className='cart_icon'>
                                    <FaCartPlus />
                                    <div className='total_items'>
                                        {totalItems}
                                    </div>
                                </Link>
                            </Nav>
                            <div className='authenticate_btns'>
                                <div className='authenticate_btns_first'>
                                    <Login 
                                     handleRegisterButtonClick={handleRegisterButtonClick}
                                     show={showLoginModal}
                                     handleShow={handleLoginButtonClick}
                                     handleClose={handleCloseLoginModal}
                                     />
                                </div>
                                <div className='authenticate_btns_second'>
                                    <Signup 
                                      handleLoginButtonClick={handleLoginButtonClick}
                                      show={showRegisterModal}
                                      handleClose={handleCloseRegisterModal}
                                      />
                                </div>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        
        
    );
};

export default Topbar;
