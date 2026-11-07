import { DirectoryLoader } from 
  '@langchain/classic/document_loaders/fs/directory';
import { TextLoader } from
  '@langchain/classic/document_loaders/fs/text';
import { HNSWLib } from 
  '@langchain/community/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 
  '@langchain/openai';

const loader = new DirectoryLoader(
  'cats',
  {
    '.txt': (path) => new TextLoader(path)
  }
);

const docs = await loader.load();
const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-ada-002' });

const vectorStore = await HNSWLib.fromDocuments(
  docs, embeddings);

await vectorStore.save('data');