import './App.scss';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Pages/Header/Header';
import Footer from './Components/Pages/Footer/Footer';
import Courses from './Components/Pages/Courses/Courses';
import SpinerLogo from './Components/CommonComponents/SpinerLogo';
import PrivateRoutes from './Routes/PrivateRoutes';
import CourseDetail from './Components/Pages/CourseDetail/CourseDetail';

// Lazy load components
const Dashbord = React.lazy(() => import('./Components/Pages/Dashbord/Dashbord'));
const CartItems = React.lazy(() => import('./Components/Pages/CartItems/CartItems'));
const Lessons = React.lazy(() => import('./Components/Pages/Lessons/Lessons'));
const BillingDetails = React.lazy(() => import('./Components/Pages/BillingDetails/BillingDetails'));
const MyCources = React.lazy(() => import('./Components/Pages/MyCourses/MyCourses'));
const MyProfile = React.lazy(() => import('./Components/Pages/MyProfile/MyProfile'));
const QuestionAnswers = React.lazy(() => import('./Components/Pages/QuestionAnswers/QuestionAnswers'));
const OfflineCourses = React.lazy(() => import('./Components/Pages/OfflineCourses/OfflineCourses'));
const Quiz = React.lazy(() => import('./Components/Pages/Quiz/Quiz'));

// Import OfflineCoursesDetail component
const OfflineCoursesDetail = React.lazy(() => import('./Components/Pages/OfflineCoursesDetail/OfflineCoursesDetail'));

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<div><SpinerLogo/></div>}>
          <Routes>
            <Route path="/" element={<Dashbord />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course_detail/:courseId" element={<CourseDetail />} />
            <Route path="/cartitems" element={<CartItems />} />
            <Route path="/offlineCourses" element={<OfflineCourses />} />
            <Route path="/offlineCoursesdetail/:courseId" element={<OfflineCoursesDetail />} />
            <Route path="*" element={<Dashbord />} />
            <Route element={<PrivateRoutes/>}>
              <Route path="mycourses" element={<MyCources />} />
              <Route path="lessons/:courseId" element={<Lessons />} />
              <Route path="billing_details" element={<BillingDetails/>} />
              <Route path="my_profile" element={<MyProfile />} />
              <Route path="questionAnswers/:subject" element={<QuestionAnswers />} />
              <Route path="quiz" element={<Quiz />}/>
            </Route>
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;



