import { useState } from 'react'
import './App.css'

function App() {
  const [llmResponse, setLlmResponse] = useState('');
  const [catType, setCatType] = useState('');
  const [question, setQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let llmResponseProgress = '';

  const renderResponseChunk = (chunk) => {
    llmResponseProgress += chunk || '';
    setLlmResponse(llmResponseProgress);
  };

  const handleCatTypeChange = (event) => {
    setCatType(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const validateCatSelection = () => {
    if (!catType) {
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

  const fetchData = async () => {
    if (!validateCatSelection()) {
      console.log('Form submitted with cat type:', catType);
    } else if (!validateQuestionSelection()) {
      console.log('Form submitted with question:', question);
    } else {
    const url = `http://localhost:3000?catType=${encodeURIComponent(catType)}&question=${encodeURIComponent(question)}`;
    const response = await fetch(url);

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const { done, value } = await reader.read();
      
      renderResponseChunk(value);
 
      if (done) {
        return;
      }
    }
  }
  };

  return (
    <>
      <h1>Cat Chat</h1>
      <div className="card">
      <h2>Choose a Cat Type:</h2>
      <img src="./public/orange-cat-clear.png" />
      <div className="row">
      <div id="ck-button" className="ck-button">
        <label>
          <input 
            type="radio" 
            value="black cat"
            checked={catType === 'black cat'}
            onChange={handleCatTypeChange}
            name="cat"
          /><span>Black Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="siamese cat"
            checked={catType === 'siamese cat'}
            onChange={handleCatTypeChange}
            name="cat"/><span>Siamese Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="calico cat"
            checked={catType === 'calico cat'}
            onChange={handleCatTypeChange}
            name="cat" /><span>Calico Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="maine coon cat"
            checked={catType === 'maine coon cat'}
            onChange={handleCatTypeChange}
            name="cat"/><span>Maine Coon Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="orange cat"
            checked={catType === 'orange cat'}
            onChange={handleCatTypeChange}
            name="cat"/><span>Orange Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="persian cat"
            checked={catType === 'persian cat'}
            onChange={handleCatTypeChange}
            name="cat"/><span>Persian Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="tabby cat"
            checked={catType === 'tabby cat'}
            onChange={handleCatTypeChange}
            name="cat"/><span>Grey Tabby Cat</span>
        </label>
      </div>
      <div id="ck-button">
        <label>
          <input 
            type="radio" 
            value="tortoise shell cat"
            checked={catType === 'tortoise shell cat'}
            onChange={handleCatTypeChange} 
            name="cat"/><span>Torti Cat</span>
        </label>
      </div>
      </div>
       
      <h2>
        "Meow, ask me a question."
      </h2>
      <p>
        <input id="question" name="question" required size="30" onChange={handleQuestionChange}/>
      </p>
      {errorMessage && <h3 className="error">{errorMessage}</h3>}
      <button onClick={fetchData}>
          Submit
      </button>
      <p>
        {llmResponse}
      </p>
      </div>
    </>
  )
}

export default App
