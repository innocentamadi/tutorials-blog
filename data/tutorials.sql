DROP DATABASE IF EXISTS tutorials_blog;
CREATE DATABASE tutorials_blog;

\c tutorials_blog;

CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR
);

CREATE TABLE authors (
  ID SERIAL PRIMARY KEY,
	preferences VARCHAR,
	user_id INTEGER REFERENCES users(ID)
);

CREATE TABLE tutorials (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
	description VARCHAR,
  duration INTEGER,
  featured_image_url VARCHAR,
  author_id INTEGER REFERENCES authors(ID)
);

CREATE TABLE chapters (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
	description VARCHAR,
  duration INTEGER,
  featured_image_url VARCHAR,
  chapter_order INTEGER,
  tutorial_id INTEGER REFERENCES tutorials(ID)
);

CREATE TABLE pages (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  body VARCHAR,
	page_order INTEGER,
  chapter_id INTEGER REFERENCES chapters(ID)
);

INSERT INTO users (first_name, last_name)
  VALUES  ('Cent', 'Amadi');

INSERT INTO authors (preferences, user_id)
	VALUES ('Developer, social enthusiast, optimist', 1);

INSERT INTO tutorials (title, duration, author_id, featured_image_url, description)
  VALUES  ('Building your first GraphQL Server', 30, 1, 'http://i.stack.imgur.com/gY8a2.png', E'## GraphQL is relatively new. \nIt''s however, already obvious to most that it is the future. In this era of data-driven apps, the ability to make declarative queries is priceless. \n\nGo through the introductory section of this course to know what GraphQL is about'),
          ('GraphQL and MongoDB', 45, 1, 'https://cdn-images-1.medium.com/max/800/1*_K0YwiL6wSKHbvxHSU7OTQ.png', 'This short course shows how GraphQL can be made to interface with MongoDB.');

INSERT INTO chapters (title, duration, tutorial_id, chapter_order, featured_image_url, description)
  VALUES  ('Setting up your environment', 10, 1, 1, 'https://cldup.com/ysnmIMhqRU.png', 'This introductory chapter covers concpets related to setting up Express and Node. This duo will be used to serve you GraphQL app. '),
          ('Get familiar with the schema', 7, 1, 2, 'https://cldup.com/ysnmIMhqRU.png', 'This chapter introduces GraphQL schema as a layer over the database schema.');

INSERT INTO pages (title, chapter_id, page_order, body)
  VALUES ('Build package.json', 1, 1,
    E'## Introduction\n\nThis posts are being served using GraphQL currently and are just static in a folder. However we can easily scale this to include databases like "Mongo", "PostgresQL", etc.\n\n Actually, I''d be pushing out code within the month covering\n * Using [GraphQL](http://learngraphql.org/) to serve static files\n* Working with MongoDB\n* Going pro with GraphQL and Postgres\n\n### So why did I release this now?\n\n<blockquote>\n    To show you that a project doesn''t have to be complete before you share.\nTake a chance. Put it out anyways.\n</blockquote>\n\n### Would the posts be coming with some code we can follow?\n```js\nvar React = require(''react'');\n\nReact.render(\n    <p className="trial-and-error">\n        We''d definitely be experimenting with differnt ways\n         to make earning easier so we can share :),\n    </p>,\n   document.getElementById(''content'')\n);\n```\n\nPretty neat, eh?\n\n## Stay tuned.\n\nRead usage information and more on [GitHub](//github.com/tru2cent/reactjs-tutorials)\n\n---------------\n\nInspired by Omeiza, I''d clean up [my blog](http://blog.cent.tech). I''d probably deprecate tutorials on that one in favor of other things more . . . random. :)'),
  ('Set up Webpack', 1, 2,
    E'## Minimal webpack setup\n\nThis posts are being served using Webpack currently and are just static in a folder. However we can easily scale this to include databases like "Mongo", "PostgresQL", etc.');
