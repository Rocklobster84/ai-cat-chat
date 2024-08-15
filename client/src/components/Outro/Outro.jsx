import React from 'react';
import './Outro.css';

const Outro = () => {
  return (
    <p id="outro">*Based on <i>The Busy Developer's Guide to Gen AI</i> by <a href="https://www.linkedin.com/in/jorshalick/" target="_blank">Jacob Orshalick</a>, this chat bot uses the RAG (Retrieval Augmented Generation) technique. The Back-end is a simple Node.js/Express app, the front-end is a React app. <a href="https://js.langchain.com/v0.2/docs/introduction/" target="_blank">LangChain</a> is a framework used to integrate with the LLM and build a Vector Store with <a href="https://js.langchain.com/v0.2/docs/integrations/vectorstores/hnswlib/" target="_blank">HNSWLib</a>, and LLM responses are powered by <a href="https://openai.com/" target="_blank">OpenAI</a>.</p>
  )
}

export default Outro;