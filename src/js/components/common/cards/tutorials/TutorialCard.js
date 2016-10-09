import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Translations from '../translations/Translations';
import {Link} from 'react-router';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="tutorial-card">
      <p className="title">{tutorial.title}</p>
      <footer>
        <div className="meta">
          By: &nbsp;
          <span className="value">
            {tutorial.author.user.first_name}
          </span>
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
