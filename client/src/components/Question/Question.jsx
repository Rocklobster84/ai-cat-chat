import React from 'react';
import './Question.css';

const Question = ({ question, setQuestion, errorMessage, setErrorMessage }) => {

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    setErrorMessage('');
  };

  return(
    <div>
    <h2 className="question-head">"Meow, ask me a question."</h2>
      <p>
        <input id="question" name="question" required size="20" value={question} onChange={handleQuestionChange}/>
      </p>
      {errorMessage && <h3 className="error">{errorMessage}</h3>}
    </div>
  )
;}

export default Question;