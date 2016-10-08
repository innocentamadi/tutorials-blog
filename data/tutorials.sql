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
  author_id INTEGER REFERENCES authors(ID)
);

CREATE TABLE chapters (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
	description VARCHAR,
  duration INTEGER,
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

INSERT INTO tutorials (title, duration, author_id)
  VALUES  ('Building your first GraphQL Server', 30, 1),
          ('GraphQL and MongoDB', 45, 1);

INSERT INTO chapters (title, duration, tutorial_id)
  VALUES  ('Setting up your environment', 10, 1),
          ('Get familiar with the schema', 7, 1);

INSERT INTO pages (title, chapter_id, page_order, body)
  VALUES ('Build package.json', 1, 1,
    '## Introduction\n\nThis posts are being served using GraphQL currently and are just static in a folder. However we can easily scale this to include databases like "Mongo", "PostgresQL", etc.\n\n Actually, I''d be pushing out code within the month covering\n * Using [GraphQL](http://learngraphql.org/) to serve static files\n* Working with MongoDB\n* Going pro with GraphQL and Postgres\n\n### So why did I release this now?\n\n<blockquote>\n    To show you that a project doesn''t have to be complete before you share.\nTake a chance. Put it out anyways.\n</blockquote>\n\n### Would the posts be coming with some code we can follow?\n```js\nvar React = require(''react'');\n\nReact.render(\n    <p className="trial-and-error">\n        We''d definitely be experimenting with differnt ways\n         to make earning easier so we can share :),\n    </p>,\n   document.getElementById(''content'')\n);\n```\n\nPretty neat, eh?\n\n## Stay tuned.\n\nRead usage information and more on [GitHub](//github.com/tru2cent/reactjs-tutorials)\n\n---------------\n\nInspired by Omeiza, I''d clean up [my blog](http://blog.cent.tech). I''d probably deprecate tutorials on that one in favor of other things more . . . random. :)');
