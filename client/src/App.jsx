import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [llmResponse, setLlmResponse] = useState('');

  let llmResponseProgress = '';

  const renderResponseChunk = (chunk) => {
    llmResponseProgress += chunk || '';
    setLlmResponse(llmResponseProgress);
  };

  const fetchData = async () => {
    const url = 'http://localhost:3000';
    const catType = document.activeElement.textContent;
    const value = document.getElementById('question').value;
    const response = await fetch(url, catType, value);

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
  };

  return (
    <>
      <h1>Cat Chat</h1>
      <div className="card">
        <button onClick={fetchData}>
          Black Cat
        </button>
        <button onClick={fetchData}>
          Siamese Cat
        </button>
        <button onClick={fetchData}>
          Calico Cat
        </button>
        <button onClick={fetchData}>
          Maine Coon Cat
        </button>
        <button onClick={fetchData}>
          Orange Cat
        </button>
        <button onClick={fetchData}>
          Persian Cat
        </button>
        <button onClick={fetchData}>
          Tabby Cat
        </button>
        <button onClick={fetchData}>
          Torti Cat
        </button>
      <h2>
        "Meow, ask me a question."
      </h2>
      <p>
        <textarea id="question" name="question" required size="30"/>
      </p>
      <p>
        {llmResponse}
      </p>
      </div>
    </>
  )
}

export default App
