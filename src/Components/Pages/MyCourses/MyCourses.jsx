import React, { useState, useEffect }  from "react";
import Rate from "../Rate/Rate";
import { Link, useNavigate } from "react-router-dom";
import SpinerLogo from "../../CommonComponents/SpinerLogo";
import "./MyCourses.scss";
import { MyCourcesApi } from '../../Api';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {logout} from "../../../store/userSlice";


const MyCources = () => {
  const [courses, setCourses] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyCourcesApi(token);
        if (response && response.myCourses) {
          setCourses(response.myCourses);
          console.log(response.myCourses, "responseresponse");
        } else {
          if(response === "error : TokenExpiredError: jwt expired"){
            toast.error("Your session is expired you have to login", {
              position: "top-center",
              autoClose: 2000,
              theme: "colored"
              })
             dispatch(logout())
          }else{
           console.error('Invalid response format:', response);
          }
     }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, token]);

  const handleLesson = (courseId) => {
    navigate(`/lessons/${courseId}`);
  };


  if (!courses) {
    return <SpinerLogo />;
  }

  return (
    <>
      <div className="courses">
        <div className="container">
          <div className="row courses_card_outer">
            {courses && courses.length > 0 ? (
              courses.map((item) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 courses_card_inner"
                  key={item._id}
                >
                  <div
                    className="courses_card "
                    onClick={() => handleLesson(item._id)}
                  >
                    <div className="course_image">
                      <img
                        src={item.imageUrl}
                        alt=""
                        onError={(e) => {
                          e.target.src =
                            "https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg";
                        }}
                      />
                    </div>
                    <div className="courses_card_descrip">
                      <h2>{item.title}</h2>
                      <h5> {item.instructor}</h5>
                      <p>{item.description}</p>
                      <div className="rating">
                        <h4>
                          <Rate />
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) :  courses?.length === 0 ? (
              <>
                <p className="msg text-center">
                  Oops! It seems like you haven't enrolled in any courses yet.
                </p>
                <Link to ="/courses" className="sub-msg text-center">
                  Explore our diverse collection of courses and start your
                  learning journey today!
                </Link >
              </>
            ) : (
              <p className="msg text-center">No courses available at this moment...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCources;
