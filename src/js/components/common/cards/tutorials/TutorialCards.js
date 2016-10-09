import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import TutorialCard from './TutorialCard';

const TutorialCards = ({ tutorials }) => {
  return (
    <div>
      {tutorials && Object.keys(tutorials).map(key => 
        <TutorialCard 
          key={key} 
          tutorial={tutorials[key]} />
      )}
    </div>
  )
 }

TutorialCards.propTypes = {
  tutorials: PropTypes.array
};

export default TutorialCards;
