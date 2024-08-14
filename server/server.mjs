import express from 'express';
import url from 'url';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import cors from 'cors';

import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

const app = express();

app.use(cors());
app.use(express.json());

const loadedVectorStore = await HNSWLib.load(
  'data', new OpenAIEmbeddings());

const retriever = loadedVectorStore.asRetriever(1);

app.get('/', async (request, response) => {
  const queryObject = url.parse(request.url, true).query;
  const selectedCat = queryObject.selectedCat;
  const question = queryObject.question;
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'ai',
      'Answer the question from a cats perspective based ' +
      'on only the following context:\n\n' +
      '{context}'
    ],
    [
      'ai',
      'You are an cat that ' +
      'answers questions for humans.' +
      'Responses should include ' +
      'answers from a cats perspective ' +
      'and incorporate some cat personality.' +
      'Each type of cat should have unique responses.' +
      'Remember to keep it light and fun.' +
      'Please do not say anything that could be offensive.'
    ],
    ['human', '{question}']
  ]);

  const setupAndRetrieval = RunnableMap.from({
    context: new RunnableLambda({
      func: (input) =>
        retriever.invoke(input).then(
          (response) => response[0].pageContent),
    }).withConfig({ runName: 'contextRetriever' }),
    question: new RunnablePassthrough(),
  });

  const model = new ChatOpenAI({});
  const outputParser = new StringOutputParser();

  const chain = setupAndRetrieval.pipe(prompt)
    .pipe(model)
    .pipe(outputParser);
  
  const stream = await chain.stream(
    `From the perspective of a ${selectedCat}, can you tell me ${question}?`
  );

  for await (const chunk of stream) {
    if (chunk) {
      response.write(chunk);
    }
  }

  response.end();
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});