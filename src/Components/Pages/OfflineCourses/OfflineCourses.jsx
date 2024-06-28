import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rate from '../Rate/Rate';
import { OfflineCourcesApi } from '../../Api';

const OfflineCources = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  console.log(courseData,"courseData");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await OfflineCourcesApi();
        console.log('data', data);
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const showCard = (courseId) => {
    const url = `/offlineCoursesdetail/${courseId}`
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
                    <h5>{item.instructor}</h5>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
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

export default OfflineCources;
