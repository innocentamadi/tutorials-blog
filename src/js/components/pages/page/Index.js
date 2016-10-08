import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import ReactMarkdown from 'react-markdown';
import pages from '../../../../../data/data/pages';
import Relay from 'react-relay';

const Page = ({page}) => {
   return (
    <div className="page-wrapper">
      <div className="title">
        <h3>
          What is ReactJS
        </h3>
      </div>

      <div className="post-content">
        <ReactMarkdown 
					source={pages[1].body} 
					htmlMode='raw' />
      </div>
    </div>
   )
 }

// Page = Relay.createContainer({
// 	initial_variables: {
// 		id: 5
// 	},
// 	fragments: {
// 		page: () => Relay.QL`
// 			fragment on Page {
// 				id,
// 				title,
// 				chapter_id,
// 				body
// 			}
// 		`
// 	}
// });
 Page.propTypes = {
 }

 export default Page;
