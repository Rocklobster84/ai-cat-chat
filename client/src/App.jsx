import { useState, useEffect } from 'react'
import './App.css'
import Intro from './components/Intro/Intro'
import CatHeader from './components/CatChoice/CatHeader'
import CatButtons from './components/CatChoice/CatButtons'
import Question from './components/Question/Question'
import Response from './components/Response/Response'
import Footer from './components/Footer/Footer'

function App() {
  const [llmResponse, setLlmResponse] = useState('');
  const [question, setQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [catImage, setCatImage] = useState('/orange-cat.png');

  useEffect(() => {
    if (llmResponse) {
      const element = document.getElementById('llmresponse');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [llmResponse]);

  let llmResponseProgress = '';



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
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
          setCatImage={setCatImage}
          setIsLoading={setIsLoading}
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage}
          llmResponseProgress={llmResponseProgress}
          setLlmResponse={setLlmResponse}
        />
        <Response 
          llmResponse={llmResponse}
          isLoading={isLoading}  
        />
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
