import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import TutorialCards from '../../common/cards/tutorials/TutorialCards';

const ListPage = ({ tutorials }) => {
   return (
     <div className="tutorials-index">
       <TutorialCards tutorials={tutorials} />
     </div>
   );
 }

 ListPage.propTypes = {
   tutorials: PropTypes.array.isRequired
 }

 export default ListPage;
