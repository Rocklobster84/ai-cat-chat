import React from 'react';
import './Response.css';

const Response = ({ llmResponse, isLoading }) => {
  return (
    <div id="llmresponse">
      {isLoading ? (<div className="spinner">Loading...</div> 
        ) : (
       <p className="llmresponse">{llmResponse}</p>
      )}
    </div>
  )
};

export default Response;