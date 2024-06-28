import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { MdAccessTimeFilled, MdLanguage } from "react-icons/md";
import { FaSlidersH, FaTag } from "react-icons/fa";
import Rate from "../Rate/Rate";
import SpinerLogo from "../../CommonComponents/SpinerLogo";
import ContactUsForm from "../ContactUsForm/ContactUsForm";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  console.log(course, "course");

  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/ASB/getCourseById/${courseId}`);
        const data = await resp.json();
        console.log(data, "data");
        if (data.status === true && data.course) {
          setCourse(data.course);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

 

  if (!course) {
    return (
      <div className="spinner">
        <SpinerLogo />
      </div>
    );
  }

  return (
    <>
      <div className="cource_detail">
        <div className="container">
          <div className="row">
            <div className="cources_decription col-md-8">
              <h2>{course.title}</h2>
              <div className="about_instructor">
                <div className="instructur_image">
                  <img
                    src={course.imageUrl}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg";
                    }}
                  />
                </div>
                <h4>{course.instructor}</h4>
              </div>
              <h4>
                <Rate />
              </h4>
              <div className="updated_date">
                <p>Last Update {formatDate(course.updatedOn)}</p>
              </div>
              <div className="about_course">
                <h3>About This Course</h3>
                <p>{course.description}</p>
              </div>

              <div className="about_course">
                <h3>Course Requirement</h3>
                <p>{course.requirements}</p>
              </div>
            </div>
            <div className=" col-md-4">
              <div className="cources_card">
                <div className="cources_card_img">
                  <img
                    src={course.imageUrl}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg";
                    }}
                  />
                </div>
                <div className="card_description">
                  <h4>
                    Price : {"\u20B9"} {course.price}
                    <span>.00</span>
                  </h4>
                  <h5>
                    <MdLanguage />
                    <span className="first_one">
                      Language : {course.language}
                    </span>
                  </h5>
                  <h5>
                    <MdAccessTimeFilled />
                    <span> Duration : {course.duration} hrs</span>
                  </h5>
                  <h5>
                    <FaSlidersH />
                    <span> Level : {course.level}</span>
                  </h5>
                  <h5 className="subject">
                    <FaTag />
                    <span> Subject :{course.subject}</span>
                  </h5>
                  <ContactUsForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
