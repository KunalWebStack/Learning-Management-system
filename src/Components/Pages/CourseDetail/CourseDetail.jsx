import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.scss";
import { useDispatch } from "react-redux";
import { addToCart, setAffiliateToken } from "../../../store/userSlice";
import { API_BASE_URL } from "../../constants";
import { MdAccessTimeFilled, MdLanguage } from "react-icons/md";
import { FaSlidersH, FaTag } from "react-icons/fa";
import Rate from "../Rate/Rate";
import { toast } from "react-toastify";
import SpinerLogo from "../../CommonComponents/SpinerLogo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isAddToCartDisabled, setAddToCartDisabled] = useState(false);

  console.log(course, "course");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.user.cart);

  const decodeAffiliateToken = (token) => {
    return decodeURIComponent(token.replace(/%20|\s/g, "+"));
  };
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/user/getCourse/${courseId}`);
        const data = await resp.json();
        console.log(data, "data");
        if (data.status === true && data.course) {
          setCourse(data.course);
          const urlParams = new URLSearchParams(window.location.search);
          const affiliateToken = urlParams.get("affiliateToken");

          if (affiliateToken) {
            console.log("Raw affiliateToken:", affiliateToken);
            const decodedToken = decodeAffiliateToken(affiliateToken);
            console.log("Decoded affiliateToken:", decodedToken);
            dispatch(setAffiliateToken(decodedToken));
          }
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId, dispatch]);

  const handleAddToCart = () => {
    setAddToCartDisabled(true);
    const existingItem = products.find((item) => item._id === course._id);
    console.log("Course to add:", course);
    console.log("Existing item in the cart:", existingItem);
    if (!existingItem) {
      dispatch(addToCart(course));
      toast.success("Successfully Added to cart", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      console.log("Item already exists in the cart");
      toast.warning("Already added to cart", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

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
                  <button className="btn btn-primary" onClick={handleAddToCart}
                   disabled={isAddToCartDisabled} 
                  >
                    Add To Cart
                  </button>
                  <button
                    className="btn btn_Continue"
                    onClick={() => navigate("/courses")}
                  >
                    Continue shopping
                  </button>
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
