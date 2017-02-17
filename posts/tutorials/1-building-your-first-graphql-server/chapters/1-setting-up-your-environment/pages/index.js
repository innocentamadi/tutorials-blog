let pages = (fileReader) => [
  {
    id: 1,
    title: "Build package.json",
    chapter_id: 1,
    page_order: 1,
    body: fileReader(__dirname + '/1-build-package-json.md')
  },
  {
    id: 2,
    title: "What is GraphQL?",
    chapter_id: 1,
    page_order: 2,
    body: [
      '## Introduction\n\nThis posts are being served using GraphQL currently and are just static in a folder. However we can easily scale this to include databases like "Mongo", "PostgresQL", etc.\n\n Actually, I\'d be pushing out tutorials within the month covering\n ',
      '* Using [GraphQL](http://learngraphql.org/) to serve static files\n* Working with MongoDB',
      '\n* Going pro with GraphQL and Postgres',
      '\n\n### So why did I release this now?\n\n<blockquote>\n    To show you that a project doesn\'t have to be complete before you share.\n',
      'Take a chance. Put it out anyways.\n</blockquote>\n\n### Would the posts be coming with some code we can follow?\n',
      '```js\nvar React = require(\'react\');\n\n',
      'React.render(\n    <p className="trial-and-error">\n        We\'d definitely be experimenting with differnt ways\n         to make earning easier so we can share :),\n    </p>,\n',
      '   document.getElementById(\'content\')\n);\n```\n\nPretty neat, eh?\n\n', '## Stay tuned.\n\n',
      'Read usage information and more on [GitHub](//github.com/tru2cent/reactjs-tutorials)\n\n',
      '---------------\n\n',
      'Inspired by Omeiza, I\'d clean up [my blog](http://blog.cent.tech). I\'d probably deprecate tutorials on that one in favor of other things more . . . random. :)'
    ].join('')
  }
];

module.exports = pages;
