import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Translations from '../translations/Translations';
import {Link} from 'react-router';

const TutorialCard = ({ tutorial }) => {
  const {authors} = tutorial.authorsConnection;
  let userIds = [];
  let uniqueAuthors = authors.filter(value => {
    userIds.push(value.user_id);
    return (userIds.indexOf(value.user_id) !== -1);
  });
  return (
    <div className="tutorial-card">
      <p className="title">{tutorial.title}</p>
      <footer>
        <div className="meta">
          By: &nbsp;
          {authors && uniqueAuthors.map(author =>
            <span key={author.user.id} className="value">
              {author.user.first_name}
            </span>)}
        </div>
        <Link to={`/tutorials/${tutorial.id}`} 
					className="btn red-button">Start</Link>
      </footer>
    </div>
  )
 }

TutorialCard.propTypes = {
  tutorial: PropTypes.object
}

export default TutorialCard;
