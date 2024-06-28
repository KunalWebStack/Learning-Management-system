import React, { useState, useEffect } from "react";
import "./QuestionAnswers.scss";
import { AllQuestions, SubmitAnswers } from "../../Api";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'; // Import useParams


const QuestionAnswers = () => {
    const token = useSelector((state) => state.user.token);
    const [questions, setQuestions] = useState([]);
    const [result, setResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [showPage, setShowPage] = useState(false)
    const { subject } = useParams();
    console.log(questions,"questions");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await AllQuestions(subject, token); 
                console.log("All questions for subject:", subject, resp.data);
                setQuestions(resp.data.questions);
            } catch (error) {
                console.error("Error fetching questions for subject:", subject, error);
            }
        };
        fetchData();
    }, [subject,token]);

    const handleOptionChange = (e) => {
        const newIndex = parseInt(e.target.value, 10); 
        setSelectedOptionIndex(newIndex);
            const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].selectedOptionIndex = newIndex;
        setQuestions(updatedQuestions);
    };

    const handleNext = () => {
        if (selectedOptionIndex !== null) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setSelectedOptionIndex(null);
        }
    };

    const handleSubmit = async () => {
        try {
            const responses = questions.map((question) => ({
                questionId: question._id,
                selectedOptionIndex: question.selectedOptionIndex !== undefined ? question.selectedOptionIndex : -1
            }));
            const submissionData = {
                responses: responses
            };
            const response = await SubmitAnswers(token, submissionData,subject);
            setResult(response.data);
            setShowPage(true);
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };
    
    
    return (
        <div className="container">
            {showPage === false ? (
                <>
                    <div className="question_header">
                        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                    
                    <div className="quiz_container">
                        {questions.length > 0 && currentQuestionIndex < questions.length && (
                            <div key={currentQuestionIndex}>
                                <h1>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].questionText}</h1>
                                <div className="options">
                                    {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                        <label key={optionIndex}>
                                            {String.fromCharCode(65 + optionIndex)}.
                                            <input
                                                type="radio"
                                                name={`question${currentQuestionIndex}`}
                                                value={optionIndex} 
                                                onChange={handleOptionChange}
                                                checked={selectedOptionIndex === optionIndex}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                
                                {currentQuestionIndex !== questions.length - 1 && (
                                    <button className="next_button" onClick={handleNext}>Next &#x276F;</button>
                                )}
                            </div>
                        )}
                    </div>
                   
                    <div className="result">
                        {currentQuestionIndex === questions.length - 1 && (
                                <button className="submit_answers" onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {result && (
                        <div className="answers animate__animated animate__swing">
                            <h1>Result</h1>
                            <p>Your Score: {result.score}</p>
                            <p>Total Questions: {result.totalQuestions}</p>
                            <p>Percentage: {result.percentage}%</p>
                            {result.percentage < 50 ? (
                                <p className="warn">You must study much harder!</p>
                            ) : (
                                <p className="success">You are on a good track.</p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuestionAnswers;
