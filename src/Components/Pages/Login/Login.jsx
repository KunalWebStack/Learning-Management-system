import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./Login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { LoginApi } from '../../Api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';
import { login,clearCart } from '../../../store/userSlice';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaEye } from "react-icons/fa";



function Login({ show, handleClose, handleShow }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const initialValues = {
        usernameOrEmail: '',
        password: '',
    };

    const validationSchema = Yup.object({
        usernameOrEmail: Yup.string().required('Username or Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
        try {
            setSubmitting(false);
            const apiResponse = await LoginApi(values);
            console.log(apiResponse, "apiResponse");

            if (apiResponse.status === false) {
                setErrors({ usernameOrEmail: 'Invalid Login Creadentaills' });
                setErrors({ password: 'Invalid Login Creadentaills' });
            }
            if (apiResponse.token) {
                console.log(apiResponse.token, "apiResponse.token");
                dispatch(login({ token: apiResponse.token }));
                dispatch(clearCart())
                navigate("/")
                toast.success("Login Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored"
                })
                handleClose();
                resetForm();
            }

        } catch (error) {
            console.error('Login failed:', error);
            toast.error("Login failed", {
                position: "top-center",
                autoClose: 2000,
            })
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleForgotPasswordClick = () => {
        handleClose();
        setShowForgotPasswordModal(true);
    };
    const handleEye = ()=>{
        setShowPassword(true)
    }
    const handleEyetwo =()=>{
        setShowPassword(false)
    }

    return (
        <>
            <Button onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="model_content">
                        {/* <h3 className='title'>Login</h3> */}
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="usernameOrEmail">Username or email</label>

                            <input
                                className='input_text'
                                type={formik.values.usernameOrEmail.includes('@') ? 'email' : 'text'}
                                id="usernameOrEmail"
                                name="usernameOrEmail"
                                placeholder="Username or email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.usernameOrEmail}

                            />

                            {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? (
                                <div className="error">{formik.errors.usernameOrEmail}</div>
                            ) : null}
                            <label htmlFor="password">Password</label>
                            <div className="icons">
                                <input
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    className='input_text'
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                 {showPassword ? (
                                    <div className='eyeicon' onClick={handleEyetwo}><AiFillEyeInvisible /></div>
                                ) : (
                                    <div className='eyeicon' onClick={handleEye}><FaEye /></div>
                                )}
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                            <div className='checkbox_outer'>
                                <Link onClick={handleForgotPasswordClick} className='forget_password' to="/forgetpassword">Forgot Your Password</Link>
                            </div>
                            <button type="submit" className='login_btn'>Login</button>
                            <div>
                                <p className='options'>or Log-in with</p>
                            </div>
                            <div className='social_button_outer'>
                                <button className="social-button">
                                    <div className='social_button_icon'>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </div>
                                    Facebook
                                </button>
                                <button className='social-button'>
                                    <p className='social_button_icon google_icon'>
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </p>
                                    Google
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <ForgotPasswordModal show={showForgotPasswordModal} handleClose={() => setShowForgotPasswordModal(false)} />
        </>
    );
}

export default Login;
