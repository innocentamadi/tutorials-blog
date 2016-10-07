import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars

const Chapter = ({children}) => {
   return (
    <div>
      <div className="chapter-wrapper">
        <h4>
          <span>
            Chapter 1:
          </span>
          Getting to know ReactJs
        </h4>
      </div>
      {children}
    </div>
   )
 }

 Chapter.propTypes = {
 }

 export default Chapter;
