import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Authors = ({authors}) => {
  let userIds = [];
  let uniqueAuthors = authors.filter(value => {
    let shouldPush = (userIds.indexOf(value.user_id) === -1);
    userIds.push(value.user_id);
   return shouldPush;
  });
  return (
    <div className="author-wrapper">
      Authors:
      {authors && uniqueAuthors.map(author =>
        <div className="author-name">
          {`${author.user.first_name} ${author.user.last_name}`}
        </div>)}
    </div>
  )
}

export default Authors;
