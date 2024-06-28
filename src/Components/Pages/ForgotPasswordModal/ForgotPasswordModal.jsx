import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { checkEmailUniqueness,updatePasswordOnBackend,sendTokenAndOTPToBackend } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';


function ForgotPasswordModal({ show, handleClose }) {
  const [showOtpField, setShowOtpField] = useState(false);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [tokenField, setTokenField] = useState('');
  const [verifyTokenPassword, setVerifyTokenPassword] = useState('');
  const navigate =useNavigate()

  const initialValues = {
    email: '',
    otp: '',
    token: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    otp: Yup.string().when('showOtpField', {
      is: true,
      then: Yup.string().required('Required'),
    }),
    token: Yup.string().when('showOtpField', {
      is: true,
      then: Yup.string().required('Required'),
    }),
    password: Yup.string().when('showNewPasswordFields', {
      is: true,
      then: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
    }),
    confirmPassword: Yup.string().when('showNewPasswordFields', {
      is: true,
      then: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
  });

  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      setSubmitting(false);
      if (showOtpField) {
        const res = await sendTokenAndOTPToBackend({ ...values, token: tokenField });
        console.log(res);
        if (res.status === true) {
          toast.success("Your otp is varified successfully",{
            position:"top-center",
            autoClose: 2000,
            theme :"colored"
        })
          setShowNewPasswordFields(true);
          const verifyToken = res.verifyToken;
          setVerifyTokenPassword(verifyToken);
          console.log('verifyToken:', verifyToken);
        }else{
          setErrors({otp:"Invalid Otp"})
        }

      } else if (showNewPasswordFields) {
        console.log('Updating password...');
        const updatePasswordRes = await updatePasswordOnBackend({
          password: values.password,
          confirmPassword: values.confirmPassword,
          verifyToken: verifyTokenPassword,
        });
        console.log(updatePasswordRes, "updatePasswordRes");
        if (updatePasswordRes.status === true) {
          toast.success("Your Password is updated successfully",{
            position:"top-center",
            autoClose: 2000,
            theme :"colored"
        })
          handleClose()
          navigate("/")
        } else {
          if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: 'Password must match' });
          } else {
            setErrors({password:'Password must be min 8 characters, 1 Uppercase, 1 Lowercase, 1 Special character, 1 Number',
            });
          }
        }

      } else {
        const res = await checkEmailUniqueness(values);
        if (res.status === false) {
          console.log('Email does not match');
          setErrors({ email: 'Please check your email' });
        }
        if (res.status === true) {
          toast.success("Otp has send to your email",{
            position:"top-center",
            autoClose: 2000,
            theme :"colored"
        })
          setShowOtpField(true);
          const token = res.token;
          setTokenField(token);
          console.log('Token:', token);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if(showNewPasswordFields){
      setShowOtpField(false);
    }
  }, [showNewPasswordFields])
  

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="model_content">
            <h3>Forgot Password</h3>
            <form onSubmit={formik.handleSubmit}>
              {!showOtpField && !showNewPasswordFields && (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    className="input_text"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </>
              )}

              {showOtpField && !showNewPasswordFields && (
                <>
                  <label htmlFor="otp">OTP</label>
                  <input
                    className="input_text"
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter your OTP"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                  />
                  {formik.touched.otp && formik.errors.otp ? (
                    <div className="error">{formik.errors.otp}</div>
                  ) : null}
                </>
              )}

              {showNewPasswordFields && (
                <>
                  <label htmlFor="password">New Password</label>
                  <input
                    className="input_text"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your new password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}

                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    className="input_text"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </>
              )}

              <button type="submit" className="login_btn">
                {showOtpField && !showNewPasswordFields ? 'Verify OTP' : 'Update Password'}
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPasswordModal;
