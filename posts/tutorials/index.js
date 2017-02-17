const tutorials = (fileReader) => [
  {
    id: 1,
    title: "Building your first GraphQL Server",
    duration: 30,
    description: fileReader('./tutorials/1-building-your-first-graphql-server/introduction.md'),
    featured_image_url: 'http://i.stack.imgur.com/gY8a2.png',
    file_name: '1-building-your-first-graphql-server',
    author_id: 1
  },
  {
    id: 2,
    title: "GraphQL and MongoDB",
    duration: 45,
    description: 'how to write in markdown',
    featured_image_url: 'https://cdn-images-1.medium.com/max/800/1*_K0YwiL6wSKHbvxHSU7OTQ.png',
    file_name: '1-building-your-first-graphql-server',
    author_id: 2
  }

];

module.exports = tutorials;

