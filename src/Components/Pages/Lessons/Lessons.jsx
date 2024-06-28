import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Lessons.scss";
import {getLessons} from "../../Api";
import { useSelector } from 'react-redux';


const Lessons = () => {
    const { courseId } = useParams();
    console.log(courseId, "courseId");
    const [lessons, setLessons] = useState([]);
    console.log(lessons, "lessons");
    const [currentPage, setCurrentPage] = useState(1);
    const lessonsPerPage = 1;
    const token = useSelector((state) => state.user.token); 


    useEffect(() => {
        const showCard = async () => {
            try {
             const response = await getLessons(courseId,token) 
             if(response.lesson.length > 0 && response.lesson){
                 setLessons(response.lesson)
             }else{
                console.log("unexpected response");
             }
            } catch (error) {
              console.log(error);
            }
             
         };
        showCard();
    }, [courseId,token]);

    const indexOfLastLesson = currentPage * lessonsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
    const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="lesson_page_outer">
                <div className="container">
                    <div className='lesons_page'>
                        {currentLessons.map((lesson, index) => (
                            <div key={index}>
                                <h2>{lesson.title}</h2>
                                <p className='para'>{lesson.content}</p>
                                <div>
                                    <p style={{ width: "560px", height: "315px", float: "none", clear: "both", margin: "2px auto" }}>
                                        <embed
                                            src="https://www.microsoft.com/es-es/videoplayer/embed/RWfmWf?pid=ocpVideo0-innerdiv-oneplayer&postJsllMsg=true&maskLevel=20&market=es-es"
                                            wmode="transparent"
                                            type="video/mp4"
                                            width="100%" height="100%"
                                            allow="autoplay; encrypted-media; picture-in-picture"
                                            allowFullScreen
                                            title="Keyboard Cat"
                                        />
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className='pagination_btn'>
                            {lessons.length > 0 && Array.from({ length: Math.ceil(lessons.length / lessonsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={i + 1 === currentPage ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lessons;
