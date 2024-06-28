import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ContactUsApi } from "../../Api";
import { toast } from 'react-toastify';


function ContactUsForm({ handleLoginButtonClick }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        lastName: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .test(
                'has-valid-domain',
                'Email must have a .com, .org, .edu, .net, .gov domain',
                (value) => {
                    const validDomains = ['com', 'org', 'edu', 'net', 'gov', 'in'];
                    const domain = value.split('.').pop().toLowerCase();
                    return validDomains.includes(domain);
                }
            )
            .required('Required'),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Invalid phone number')
            .required('Required'),

        city: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(false)
            const apiResponse = await ContactUsApi(values);
            console.log(values, "values>>");
            if (apiResponse.status === true) {
                toast.success("Congrats we will contact with you shortly", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored"
                })
                handleClose();
                resetForm()
            }
        } catch (error) {
            console.error('Something went wrong:', error);
            toast.error("Something went wrong please try again", {
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


    return (
        <>
            <div data-testid="signup-1">
                <Button variant="primary" onClick={handleShow}>
                    Contact us
                </Button>

                <Modal show={show} onHide={handleClose} centered className='model_content_signup_outer'>
                    <Modal.Header closeButton>
                        <Modal.Title>Contact Us</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="model_content model_content_signup">
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
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            placeholder='Your Phone Number'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone}
                                        />
                                        {formik.touched.phone && formik.errors.phone ? (
                                            <div className="error">{formik.errors.phone}</div>
                                        ) : null}
                                    </div>
                                    <div className='col-md-6'>
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder='City'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.city}
                                        />
                                        {formik.touched.city && formik.errors.city ? (
                                            <div className="error">{formik.errors.city}</div>
                                        ) : null}
                                    </div>
                                    <div className='col-md-6'>
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            placeholder='State'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.state}
                                        /> 
                                        {formik.touched.state && formik.errors.state ? (
                                            <div className="error">{formik.errors.state}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <button type="submit" className='login_btn'>Submit</button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default ContactUsForm;
