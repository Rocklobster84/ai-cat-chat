# Welcome to AI Cat Chat

AI Cat Chat is an app that utilizes Node.js/Express, React, LangChain, and OpenAI to create your friendly neighbor cat chatbot. Using the Retrieval Augmented Generation technique to optimize the output of a large language model, this bot uses information from a vector store containing 8 different cat types to help generate customized responses based on the cat chosen. LangChain is used to customize the chat prompt further to ensure responses vary based on each cat type and follow a specified context.

To get started, install all dependencies in both the client and server directories with:
`npm i`

To start the server
`npm start`

To start the client
`npm run dev`

An API key needs to be obtained from OpenAI (https://openai.com/) and assigned to an environment variable named VITE_API_URL.