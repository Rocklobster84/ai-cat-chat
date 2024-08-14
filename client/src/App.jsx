import { useState, useEffect } from 'react'
import './App.css'
import Intro from './components/Intro/Intro'
import CatHeader from './components/CatChoice/CatHeader'
import CatButtons from './components/CatChoice/CatButtons'
import Question from './components/Question/Question'
import Footer from './components/Footer/Footer'

function App() {
  const [llmResponse, setLlmResponse] = useState('');
  const [question, setQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [catImage, setCatImage] = useState('/orange-cat.png');
  const [catID, setCatID] = useState('');

  useEffect(() => {
    if (llmResponse) {
      const element = document.getElementById('llmresponse');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [llmResponse]);

  let llmResponseProgress = '';

  const renderResponseChunk = (chunk) => {
    llmResponseProgress += chunk || '';
    setLlmResponse(llmResponseProgress);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    setErrorMessage('');
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

  const handleReset = () => {
    setSelectedCat('');
    setCatImage('/orange-cat.png');
    setQuestion('');
    setLlmResponse('');
    setErrorMessage('');
    setIsLoading(false);
  };

  const fetchData = async () => {
    console.log(`The selected cat is ${selectedCat}`)
  
    if (!validateCatSelection()) {
      console.log('Form submitted with cat type:', selectedCat);
    } 
    else if (!validateQuestionSelection()) {
      console.log('Form submitted with question:', question);
    } 
    else {

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


  return (
    <>
      <Intro />
      <div className="card">
        <CatHeader />
        <CatButtons 
          selectedCat={selectedCat} 
          setSelectedCat={setSelectedCat} 
          catImage={catImage} 
          setCatImage={setCatImage}
        />  
        <Question 
          question={question} 
          setQuestion={setQuestion} 
          errorMessage={errorMessage} setErrorMessage={setErrorMessage}
        />
      </div>
       
     
      <button onClick={fetchData}>
          Submit
      </button>
      <button onClick={handleReset}>
            Reset
        </button>
        <div id="llmresponse" className="llmresponse">
          {isLoading ? (
          <div className="spinner">Loading...</div> // Loading spinner
          ) : (
          <p>{llmResponse}</p>
        )}
        </div>
        < br />
        <br />
        <br />
        <p>*Based on <i>The Busy Developer's Guide to Gen AI</i> by <a href="https://www.linkedin.com/in/jorshalick/" target="_blank">Jacob Orshalick</a>, this chat bot uses the RAG (Retrieval Augmented Generation) technique.
        Back-end is a simple Node.js/Express app, front-end is a React app. <a href="https://js.langchain.com/v0.2/docs/introduction/" target="_blank">LangChain</a> is a framework used to integrate with the LLM and build a Vector Store with <a href="https://js.langchain.com/v0.2/docs/integrations/vectorstores/hnswlib/" target="_blank">HNSWLib</a>, LLM responses are powered by <a href="https://openai.com/" target="_blank">OpenAI</a>.</p>
        <Footer />
    </>
  )
}

export default App
