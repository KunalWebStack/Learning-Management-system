import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Signup.scss";
import { SignupApi } from "../../Api";
import { toast } from 'react-toastify';
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

function Signup({ handleLoginButtonClick }) {
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        lastName: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        userName: Yup.string().required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .test(
                'has-valid-domain',
                'Email must have a .com, .org, .edu, .net, .gov domain',
                (value) => {
                    const validDomains = ['com', 'org', 'edu', 'net', 'gov','in'];
                    const domain = value.split('.').pop().toLowerCase();

                    return validDomains.includes(domain);
                }
            )
            .required('Required'), phoneNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Invalid phone number')
                .required('Required'),
        password: Yup.string()
            .required('Required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        acceptTerms: Yup.boolean()
            .oneOf([true], 'You must accept the Terms and Privacy Policy')
            .required('You must accept the Terms and Privacy Policy'),

    });

    const onSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        console.log(values, "instructor");
        try {
            setSubmitting(false)
            const apiResponse = await SignupApi(values);
            console.log(apiResponse, "apiResponse");
            if (apiResponse.message === "UserName already exists" && apiResponse.status === false) {
                setErrors({ userName: 'Username already exists' });
            }
            if (apiResponse.message === "Email already exists" && apiResponse.status === false) {
                setErrors({ email: 'Email already exists' });
            }
            if (apiResponse.message === "phoneNumber already exists" && apiResponse.status === false) {
                setErrors({ phoneNumber: 'phonNumber already exists' });
            }
            if (apiResponse.status === true) {
                console.log("Success +++++++++++++++");
                toast.success("User Registerd Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored"
                })
                handleClose();
                handleLoginButtonClick();
                resetForm()
            }


        } catch (error) {
            console.error('Signup failed:', error);
            toast.error("Signup failed", {
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

    const handleEye = () => {
        setShowPassword(true)
    }
    const handleEyetwo = () => {
        setShowPassword(false)
    }

    return (
        <>
        <div data-testid="signup-1">
            <Button variant="primary" onClick={handleShow}>
                Register
            </Button>

            <Modal show={show} onHide={handleClose} centered className='model_content_signup_outer'>
                <Modal.Header closeButton>
                   <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="model_content model_content_signup">
                        {/* <h3 className='title'>Sign Up</h3> */}
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className='col-md-6'>
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder='First Name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstName}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="error">{formik.errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder='Last Name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastName}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="error">{formik.errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor="userName">User Name</label>
                                    <input
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        placeholder='User Name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.userName}
                                    />

                                    {formik.touched.userName && formik.errors.userName ? (
                                        <div className="error">{formik.errors.userName}</div>
                                    ) : null}

                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder='Your Email'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="error">{formik.errors.email}</div>
                                    ) : null}

                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder='Your Phone Number'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                        <div className="error">{formik.errors.phoneNumber}</div>
                                    ) : null}
                                </div>


                                <div className='col-md-6'>
                                    <label htmlFor="password">Password</label>
                                    <div className="icons">
                                        <input
                                            type={
                                                showPassword ? "text" : "password"
                                            }
                                            id="password"
                                            name="password"
                                            placeholder='Password'
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
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor="confirmPassword">Re-Enter-Password</label>
                                    <div className="icons">
                                        <input
                                            // type={
                                            //     showPassword ? "text" : "password"
                                            // } 
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder='Re-Enter-Password'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword}
                                        />
                                        {/* {showPassword ? (
                                            <div className='eyeicon' onClick={handleEyetwo}><AiFillEyeInvisible /></div>
                                        ) : (
                                            <div className='eyeicon' onClick={handleEye}><FaEye /></div>
                                        )} */}
                                    </div>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="error">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='checkbox col-md-12'>
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.acceptTerms}
                                />
                                <label htmlFor="acceptTerms">Accept the Terms and Privacy Policy</label>
                                {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                                    <div className="error">{formik.errors.acceptTerms}</div>
                                ) : null}
                            </div>
                            <button type="submit" className='login_btn'>Register</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            </div>
        </>
    );
}

export default Signup;
