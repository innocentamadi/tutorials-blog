import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars

const Tutorial = ({children}) => {
   return (
    <div className="panel-container tutorial-page">
      <div className="topic-wrapper">
        <h3>
          <span>
            Title: 
          </span>
          Building a framework with ReactJS
        </h3>
      </div>
     {children}
    </div>
   )
 }

 Tutorial.propTypes = {
 }

 export default Tutorial;
