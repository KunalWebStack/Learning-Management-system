import React, { useEffect, useState } from 'react';
import "./Quiz.scss";
import { SubjectApi } from "../../Api";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../store/userSlice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const Quiz = () => {
    const token = useSelector((state) => state.user.token);
    const [subjects, setSubjects] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(subjects);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await SubjectApi(token)
            console.log(resp, ">>>>>>>>>>>>>>");
            if (resp.data.subjects) {
                setSubjects(resp.data.subjects)
            } else {
                if (resp.data === "error : TokenExpiredError: jwt expired") {
                    toast.error("Your session is expired you have to login", {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "colored"
                    })
                    dispatch(logout())
                } else {
                    console.error('Invalid response format:', resp);
                }
            }
        }
        fetchData()
    }, [token, dispatch])

    const handleClick = (clickedSubject) => {
        navigate(`/questionAnswers/${clickedSubject}`)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {subjects && subjects.length > 0 ? (
                        subjects?.map((subject, index) => (
                            <div key={index} className="col-md-4" onClick={() => handleClick(subject)}>
                                <div className='row'>
                                    <div className="col-md-12">
                                        <div className='box'>
                                            <h2>{subject}</h2>
                                            <p>try our test for free</p>
                                            <button>Start Quiz</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-md-12">
                            <p>No subjects available at the moment please try after some time.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Quiz;
