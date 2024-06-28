import React, { useEffect, useState } from 'react';
import "./MyProfile.scss";
import { useSelector ,useDispatch} from 'react-redux';
import { UserDetails, ReffrelCodeApi, getAffileateApi, getAffileateStatusApi, updateUserDetails } from "../../Api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {logout} from "../../../store/userSlice"

const MyProfile = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [getReffralCode, setGetReffralCode] = useState({});
  const [affiliateCodeStatus, setAffiliateCodeStatus] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [ status ,setStatus] = useState(true)
  const [firstNameError, setfirstNameError] = useState('');
  const [lastNameError,setLastNameError] = useState("")
  const [userNameError, setUserNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [pendingChanges, setPendingChanges] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: ''
  });
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserDetails(token);
        console.log(response, "userDetails");
        if (response && response.userData) {
          setProfileDetails(response.userData);
          setPendingChanges({
            firstName: response.userData.firstName,
            lastName: response.userData.lastName,
            userName: response.userData.userName,
            phoneNumber: response.userData.phoneNumber
          });
          console.log(response, 'responseresponse');
        } else {
           if(response === "error : TokenExpiredError: jwt expired"){
             toast.error("Your session is expired you have to login", {
               position: "top-center",
               autoClose: 2000,
               theme: "colored"
               })
              dispatch(logout())
              navigate("/")
           }else{
            console.error('Invalid response format:', response);
           }
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token,status,dispatch,navigate]);

  const handleEditAllFields = () => {
    setEditingField('editMode');
    setPendingChanges({
      firstName: profileDetails.firstName,
      lastName: profileDetails.lastName,
      userName: profileDetails.userName,
      phoneNumber: profileDetails.phoneNumber
    });
    setfirstNameError("")
    setLastNameError("")
    setUserNameError('');
    setPhoneNumberError('');
  };

  const handleSaveField = async () => {
    try {
      const response = await updateUserDetails(profileDetails._id, pendingChanges);
      console.log("response",response);
      if (response.message === "updated successfully" && response.status === true) {
        setEditingField(null);
        setProfileDetails((prevProfileDetails) => ({
          ...prevProfileDetails,
          ...pendingChanges,
        }));
        setPendingChanges({
          firstName: '',
          lastName: '',
          userName: '',
          phoneNumber: ''
        });
      } 
      else if ((response.message === "firstName must be at least 3 characters long" || response.message === "firstName must be only Alphabets") && response.status ===false){
        setfirstNameError(response.message)
      } else if ((response.message === "lastName must be at least 3 characters long" || response.message === "lastName must be only Alphabets") && response.status === false){
        setLastNameError(response.message)
      }else if ((response.message === "userName already exists" || response.message === "Username must be at least 3 characters long") && response.status === false) {
        setUserNameError(response.message);
      } else if ((response.message === "phoneNumber already exists" || response.message === "phoneNumber must have 10 digits") && response.status === false) {
        setPhoneNumberError(response.message);
      }
      else {
        console.error(`Error updating fields:`, response.message);
      }
    } catch (error) {
      console.error(`Error updating fields:`, error);
    }
  };

  const handleReffrelGenrate = async () => {
    try {
      const response = await ReffrelCodeApi(token);
      if (response.status === true && response.referrelCode) {
        setGetReffralCode(response);
      } else {
        console.log(" something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAffileateStatus();
    // eslint-disable-next-line
  }, []);
 

  

  const handleAffiliate = async () => {
    try {
      const res = await getAffileateApi(token);
      console.log(res, ">>>>>>>>res>>>>>>>");
      if (res.status === true) {
        setStatus(false)
        console.log("handleGetAffileateStatus called");
      }
      console.log(res, ">>>>>>>>>>>>res>>>>>>>");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAffileateStatus = async () => {
    try {
      const res = await getAffileateStatusApi(token);
      console.log(res, ">>>>>>>>res>>>>>>>");
      if (res.status === true && res.message) {
        setAffiliateCodeStatus(res);
      }
      console.log(res, ">>>>>>>>>>>>resgetAffileateStatusApi>>>>>>>");
    } catch (error) {
      console.log(error);
    }
  };

  const { email, created_on, firstName, lastName, phoneNumber, userName } = profileDetails;
  const formattedDate = new Date(created_on).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const firstLetterFirstName = firstName ? firstName.charAt(0).toUpperCase() : '';
  const firstLetterLastName = lastName ? lastName.charAt(0).toUpperCase() : '';
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = '#9784C2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '80px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${firstLetterFirstName}${firstLetterLastName}`, canvas.width / 2, canvas.height / 2);

  const imgSrc = canvas.toDataURL();

  return (
    <>
      <div>
        <div className="container">
          {
            <div className='profile_main'>
              <div className='profile_main_inner' >
                <div className='profile_img'>
                  <div className='profile_img'><img src={imgSrc} alt="" /></div>
                  <h1>{firstName} {lastName}</h1>
                </div>
                <div>
                  <div className='reffrel'>
                    <button className='btn btn-outline-primary' onClick={handleReffrelGenrate}>Reffrel Code</button>
                    {getReffralCode.referrelCode && (
                      <h2>{getReffralCode.referrelCode}</h2>
                    )}
                  </div>
                  <div className='affiliate_link'>
                    {
                      profileDetails.affilliationLinkRequested ?
                          <button onClick={handleAffiliate}>Get Affiliate Link</button>:
                      <div className='text-center'>
                          <button className='btn' onClick={handleGetAffileateStatus}>Your Status</button>
                          <p className='pt-2'>{affiliateCodeStatus.message}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className='my_profile_meain'>
                <div className='editing'>
                  <h1>My Profile</h1>
                  {editingField === 'editMode' && (
                    <button className='save_btn' onClick={handleSaveField}>Save</button>
                  )}
                  {editingField !== 'editMode' && (
                    <button className='edit_btn' onClick={handleEditAllFields}>Edit </button>
                  )}
                </div>
                <div className='my_profile_meain_inner'>
                  <div className='my_pro_info'>
                    <h4>Email</h4>
                    <p>{email}</p>
                  </div>
                  <div className='my_pro_info'>
                    <h4>Registration Date</h4>
                    <p>{formattedDate}</p>
                  </div>
                  <div className='my_pro_info'>
                    <h4>First Name</h4>
                    {editingField === 'editMode' ? (
                      <div>
                        <input
                          type='text'
                          value={pendingChanges.firstName}
                          onChange={(e) => setPendingChanges({ ...pendingChanges, firstName: e.target.value })}
                        />
                        <p className='error-message'>{firstNameError}</p>
                      </div>
                    ) : (
                      <p>{firstName}</p>
                    )}
                  </div>
                  <div className='my_pro_info'>
                    <h4>Last Name</h4>
                    {editingField === 'editMode' ? (
                      <div>
                      <input
                        type='text'
                        value={pendingChanges.lastName}
                        onChange={(e) => setPendingChanges({ ...pendingChanges, lastName: e.target.value })}
                      />
                      <p className='error-message'>{lastNameError}</p>
                      </div>
                    ) : (
                      <p>{lastName}</p>
                    )}
                  </div>
                  <div className='my_pro_info'>
                    <h4>Username</h4>
                    {editingField === 'editMode' ? (
                      <div>
                        <input
                          type='text'
                          value={pendingChanges.userName}
                          onChange={(e) => setPendingChanges({ ...pendingChanges, userName: e.target.value })}
                        />
                        <p className='error-message'>{userNameError}</p>
                      </div>
                    ) : (
                      <p>{userName}</p>
                    )}
                  </div>
                  <div className='my_pro_info'>
                    <h4>Phone Number</h4>
                    {editingField === 'editMode' ? (
                      <div>
                        <input
                          type='number'
                          value={pendingChanges.phoneNumber}
                          onChange={(e) => setPendingChanges({ ...pendingChanges, phoneNumber: e.target.value })}
                        />
                        <p className='error-message'>{phoneNumberError}</p>
                      </div>
                    ) : (
                      <p>{phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default MyProfile;
