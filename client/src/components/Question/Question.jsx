import React from 'react';
import './Question.css';

const Question = ({ question, setQuestion, selectedCat, setSelectedCat, setCatImage, setIsLoading, errorMessage, setErrorMessage, llmResponseProgress, setLlmResponse }) => {

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    setErrorMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchData(event);
    }
  };

  const handleReset = () => {
    setSelectedCat('');
    setCatImage('/orange-cat.png');
    setQuestion('');
    setLlmResponse('');
    setErrorMessage('');
    setIsLoading(false);
  };

  const validateCatSelection = () => {
    if (!selectedCat) {
      setErrorMessage('Please select a cat type!');
      return false;
    }
    return true;
  };

  const validateQuestionSelection = () => {
    if (!question) {
      setErrorMessage('Please ask a question!');
      return false;
    }
    return true;
  };

  const renderResponseChunk = (chunk) => {
    llmResponseProgress += chunk || '';
    setLlmResponse(llmResponseProgress);
  };

  const fetchData = async () => {
    console.log(`The selected cat is ${selectedCat}`)
  
    if (!validateCatSelection()) {
      console.log('No cat selected.');
    } else if (!validateQuestionSelection()) {
      console.log('No question entered.');
    } else {

    setIsLoading(true);
    const apiURL = import.meta.env.VITE_API_URL;
 
    const url = `${apiURL}?selectedCat=${encodeURIComponent(selectedCat)}&question=${encodeURIComponent(question)}`;
    
    const response = await fetch(url);
    console.log(response);
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const { done, value } = await reader.read();
      setIsLoading(false);
      renderResponseChunk(value);
 
      if (done) {
        return;
      }
    } 
  }
};

  return(
    <div>
      <h2 className="question-head">"Meow, ask me a question."</h2>
        <p>
          <input id="question" name="question" required size="20" value={question} onChange={handleQuestionChange} onKeyDown={handleKeyDown}/>
        </p>
        {errorMessage && <h3 className="error">{errorMessage}</h3>}
    
      <input type="button" className="button" value="Submit" onClick={fetchData} />
      <input type="button" className="button" value="Reset" onClick={handleReset} />
    </div>
  )
;}

export default Question;