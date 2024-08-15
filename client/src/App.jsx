import { useState, useEffect } from 'react'
import './App.css'
import Intro from './components/Intro/Intro'
import CatHeader from './components/CatChoice/CatHeader'
import CatButtons from './components/CatChoice/CatButtons'
import Question from './components/Question/Question'
import Response from './components/Response/Response'
import Outro from './components/Outro/Outro'
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
        <Outro />
      </div>
      <Footer />
    </>
  )
}

export default App
