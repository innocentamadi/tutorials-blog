import postReader from './postReader';

export const tutorials = [
  {
    id: 1,
    title: "Building your first GraphQL Server",
    duration: 30,
    description: postReader.getPost(1),
    author_id: 1
  },
  {
    id: 2,
    title: "GraphQL and MongoDB",
    duration: 45,
    body: 'how to write in markdown',
    author_id: 2
  }
]
