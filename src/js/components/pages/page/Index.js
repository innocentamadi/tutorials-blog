import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router';
import {
  objectWithMinValue,
  objectWithMaxValue
} from '../../../utils/enumsHelpers.js';

const NavButtons = ({chapter, page}) => {
  let prevPostId = page.id + 1;
  let nextPostId = page.id
  return (
    <div className="button-wrapper">
      {prevPostId != page.id ?
         <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.id}/pages/${prevPostId}`} 
          className="btn btn-default red">
          {'<--- Previous page'}
        </Link> :
        <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.id}/`}
          className="btn btn-default red">
          {'<--- Back to chapter intro'}
       </Link> }

       {nextPostId != page.id ?
         <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.id}/pages/${nextPostId}`} 
          className="btn btn-default green">
          {'Next page --->'}
        </Link> :
        <Link to={`/tutorials`} 
          className="btn btn-default green">
          {'Back to all tutorials --->'}
        </Link>}
    </div>
  )
}

const Page = ({chapter, page}) => {
   return (
    <div className="page-wrapper">
      <div className="title">
        <h3>
          {page.title}
        </h3>
      </div>

      <div className="post-content">
        <ReactMarkdown 
					source={page.body} 
					htmlMode='raw' />
        <NavButtons {...{chapter, page}} />
      </div>
    </div>
   )
 }

const pageQuery = gql`
	query MyQuery ($id: ID!, $chapterId: ID!) {
		store {
      chapter(id: $chapterId) {
        id,
        tutorial_id
      }
      page(id: $id) {
        id
        title
        chapter_id
        body
        page_order
      }
		}
	}
`;

const PageWithData = graphql(pageQuery, {
  options: ({params}) => ({
    variables: {
      id: params.pageId,
      chapterId: params.chapterId
    }
  }),
  props: ({data}) => ({
    page: !data.loading ? data.store.page : {},
    chapter: !data.loading ? data.store.chapter : {}
  }),
})(Page);

export default connect()(PageWithData);
