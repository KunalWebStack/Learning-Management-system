import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Courses.scss';
import Rate from '../Rate/Rate';

const Courses = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;
  const userCourses = useSelector((state) => state.user.myCourses);
  const courseData = useSelector((state) => state.courses.courseData);


  const affiliateToken = ""
  //  "U2FsdGVkX1/R/UpswW6L9OSoccrOwHHh0jZzKbs5X3QW3LOYET98Lbo6x+SN9x4engsYrW+ekh1s4Z8/TedVPVPNtJvjRzIPGiQdPYxkIIm0IpNWyb5ZPrYAa+RdAZwL6Z8z5pU+CeQzeBoYUmGgjx5F2SGAxi6dQCQbudAQHSSnnwrHA1y5Nv/gEoImyAnsSHgbD51xknj7SW912ICnLw=="


  const showCard = (courseId) => {
    const courseExists = userCourses.find((userCourse) => userCourse._id === courseId);

    const url = courseExists
    ? `/lessons/${courseId}`
    : affiliateToken
    ? `/course_detail/${courseId}?affiliateToken=${affiliateToken}`
    : `/course_detail/${courseId}`;

  navigate(url);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses =
  courseData && courseData.courses ? courseData.courses.slice(indexOfFirstCourse, indexOfLastCourse) : [];

  return (
    <>
      <div className='courses'>
        <div className='container'>
          { courseData ? (
            <>
          <div className='row courses_card_outer'>
            {currentCourses.map((item) => (
              <div className='col-lg-3 col-md-4 col-sm-6 courses_card_inner' key={item._id}>
                <div onClick={() => showCard(item._id)} className='courses_card'>
                  <div className='course_image'>
                    <img
                      src={item.imageUrl}
                      alt=''
                      onError={(e) => {
                        e.target.src =
                          'https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg';
                      }}
                      loading='lazy'
                    />
                  </div>
                  <div className='courses_card_descrip'>
                    {userCourses.find((userCourse) => userCourse._id === item._id) ? (
                      <>
                        <p>You already own this course</p>
                      </>
                    ) : (
                      <>
                        <button className='btn btn-success'>Buy Now</button>
                      </>
                    )}
                    <h5>{item.instructor}</h5>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    {userCourses.find((userCourse) => userCourse._id === item._id) ? (
                      <>
                      </>
                    ) : (
                      <>
                        <h4>
                          {'\u20B9'}
                          {item.price}.00
                        </h4>
                      </>
                    )}
                    <div className='rating'>
                      <h4>
                        <Rate />
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='pagination'>
            {Array.from({ length: Math.ceil((courseData?.courses?.length || 0) / coursesPerPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
          </>
           ):(
           <p className='msg text-center'>  
               We currently don't have any courses available. Please check back later for exciting new courses!
           </p>
           )}
        </div>
      </div>
    </>
  );
};

export default Courses;
