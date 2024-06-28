import axios from 'axios';
import { API_BASE_URL } from "./constants"

export const SignupApi = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in SignupApi:', error);
    if (error.response) {
      const { data } = error.response;

      if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        console.error('Server response error:', firstError);
        return { message: firstError.msg, status: false };
      } else {
        console.error('Server response:', data);
        return { message: data.message || 'Server error', status: false };
      }
    } else if (error.request) {
      console.error('No response received from the server');
      return { message: 'No response from the server', status: false };
    } else {
      console.error('Error in request setup:', error.message);
      return { message: 'Request setup error', status: false };
    }
  }
};

export const LoginApi = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const checkEmailUniqueness = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/generateOTP`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response.data);

    return response.data;

  } catch (error) {
    console.error(error, "eeeeeeeeeeee");
    throw error;
  }
};



export const sendTokenAndOTPToBackend = async (values) => {
  const { token } = values
  try {
    const response = await fetch(`${API_BASE_URL}/user/verifyOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, token }),
    });

    console.log(response, 'resppppppppp');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updatePasswordOnBackend = async (values) => {
  const { password, confirmPassword, verifyToken } = values;
  try {
    const resp = await fetch(`${API_BASE_URL}/user/changePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        confirmPassword,
        verifyToken,
      }),
    });
    const data = await resp.json();
    console.log("Response from updatePasswordOnBackend:", data);
    return data
  } catch (error) {
    throw error;

  }
};

export const getAllCources = async () => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/user/allCourses`);

    const data = resp.data;
    console.log("Response from getAllCources", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}






export const getLessons = async (courseId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/allCourses/${courseId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    })
    console.log('API response:', response.data);
    return response.data;

  } catch (error) {

  }

}


export const BillingApi = async (values, token) => {

  console.log(values, "values");
  try {
    const response = await axios.post(`${API_BASE_URL}/user/payment`, values, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const MyCourcesApi = async (token, values = {}) => {
  console.log(token, "tokentokentokentoken");
  try {
    const response = await axios.get(`${API_BASE_URL}/user/myCourses`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
      params: values,
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {

    console.log(error, "????????????");
    return error.response;
  }
};


export const UserDetails = async (token) => {

  try {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });
    console.log('API response:', response.data);
    return response.data;


  } catch (error) {
    return error
  }
}


export const ReffrelCodeApi = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/referalCode`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });
    console.log('API response:', response.data);
    return response.data;

  } catch (error) {

  }
}

export const getReffrelCodeApi = async (token, values) => {
  console.log(">>>>>>>>> token, values>>>>>>>>>>", token, values);
  try {
    const response = await axios.post(`${API_BASE_URL}/user/applyReferalCode`, values, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });

    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.log("errrrrrrrrr", error);
    return error
  }
};


export const getAffileateApi = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/affiliationRequest`, {

    },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-authorization': token,
        },
      }
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);

    throw error;
  }
};

export const getAffileateStatusApi = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/affiliateRequestStatus`, {
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-authorization': token,
        },
      }
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};


export const updateUserDetails = async (_id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/updateUser/${_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('Error in updateUserDetails:', error);
    if (error.response) {
      const { data } = error.response;

      if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        console.error('Server response error firstError:', firstError);
        return { message: firstError.msg, status: false };
      } else {
        console.error('Server response:', data);
        return { message: data.message || 'Server error', status: false };
      }
    } else if (error.request) {
      console.error('No response received from the server');
      return { message: 'No response from the server', status: false };
    } else {
      console.error('Error in request setup:', error.message);
      return { message: 'Request setup error', status: false };
    }
  }
};

export const SubjectApi = async(token) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/question/getSubjects`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-authorization': token,
        },
      })
      console.log(response,"this is resp from SubjectApi");
      return response
  } catch (error) {
    console.log(error);
     return error
  }
}

export const AllQuestions = async (subject,token) => {
  console.log(subject,">>>>>>>>>>>>>");
  try {
    const response = await axios.get(`${API_BASE_URL}/question/getAllQuestions/${subject}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    })
    console.log("allquestionsresponse", response);
    return response
  } catch (error) {
    return error
  }
}

export const SubmitAnswers = async (token, values,subject) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/question/submit`,  { ...values, subject }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    })
    console.log("allquestionsresponse", response);
    return response
  } catch (error) {
    return error
  }
}
export const OfflineCourcesApi = async (values) => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/ASB/getAllCourses`);
    const data = resp.data;
    console.log("Response from OfflineCourcesApi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const ContactUsApi = async (values) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/ASB/asbStudentEnroll`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = resp.data;
    console.log("Response from ContactUsApi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

