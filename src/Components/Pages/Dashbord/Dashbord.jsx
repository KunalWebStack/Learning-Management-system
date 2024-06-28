import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from "../../../Assets/animation.json";
import './Dashbord.scss';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import Rate from '../Rate/Rate';
import { useNavigate } from 'react-router-dom';
import { getAllCources, MyCourcesApi } from '../../Api';
import { toast } from 'react-toastify';
import { logout, setMyCourses } from "../../../store/userSlice";
import { setCourseDatas } from "../../../store/coursesSlice";

const Dashbord = () => {
  const [courseData, setCourseData] = useState({ courses: [] });
  const [courses, setCourses] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCources();
        if (data && data.courses) {
          setCourseData(data);
          dispatch(setCourseDatas(data));
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyCourcesApi(token);
        if (response && response.myCourses) {
          dispatch(setMyCourses(response.myCourses));
          setCourses(response.myCourses);
        } else {
          if (response === "error : TokenExpiredError: jwt expired") {
            toast.error("Your session is expired. You have to login.", {
              position: "top-center",
              autoClose: 2000,
              theme: "colored"
            });
            dispatch(logout());
          } else {
            console.error('Invalid response format:', response);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch, token]);

  const showCard = (courseId) => {
    const courseExists = courses.find((userCourse) => userCourse._id === courseId);
    if (courseExists) {
      navigate(`/lessons/${courseId}`);
    } else {
      navigate(`/course_detail/${courseId}`);
    }
  };

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="dashbord_outer">
        <div className="container">
          <div className="row dashbord">
            <div className="col-md-6">
              <div className="learning">
                <h4>Keep Learning</h4>
                <h2>Connect With Our Expert</h2>
                <h3>Acquire global knowledge and build your professional skills</h3>
                <div className="learning_btn">
                  <NavLink to="/courses">Find courses</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-6">
                <div className="man_image_outer">
                  <div className="man_image_inner">
                    <Lottie animationData={animationData} className="lottie-animation" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="courses">
          <div className="row courses_card_outer">
            <h1 className="dashboard_heading">Here Our Courses</h1>
            {courseData && courseData.courses && courseData.courses.length > 0 ? (
              <Slider {...settings}>
                {courseData.courses.map((course) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 courses_card_inner" key={course._id}>
                    <div className="courses_card dashboard_card" onClick={() => showCard(course._id)}>
                      <div className="course_image dashboard_image">
                        <img
                          src={course.imageUrl}
                          alt=""
                          onError={(e) => {
                            e.target.src =
                              'https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg';
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="courses_card_descrip">
                        <h5>{course.title}</h5>
                        <p>{course.description}</p>
                        <div className="rating">
                          <h4>
                            <Rate />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className='text-center'>No courses available at this moment...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbord;

