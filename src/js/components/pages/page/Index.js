import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {createFragment} from 'apollo-client';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router';
import {
  objectWithMinValue,
  objectWithMaxValue
} from '../../../utils/enumsHelpers.js';

const NavButtons = ({chapter, page, prevPage, nextPage}) => {
  return (
    <div className="button-wrapper">
      {prevPage ?
         <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.chapter_order}/pages/${prevPage.page_order}`} 
          className="btn btn-default red">
          {'<< Previous page'}
        </Link> :
        <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.chapter_order}/`}
          className="btn btn-default red">
          {'<< Back to Chapter Intro'}
       </Link> }

       {nextPage ?
         <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.chapter_order}/pages/${nextPage.page_order}`} 
          className="btn btn-default green">
          {'Next page >>'}
        </Link> :
        <Link to={`/tutorials`} 
          className="btn btn-default green">
          {'Back to all tutorials >>'}
        </Link>}
    </div>
  )
}

const Page = ({chapter, page, prevPage, nextPage}) => {
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
        <NavButtons {...{chapter, page, prevPage, nextPage}} />
      </div>
    </div>
   )
 }

const navPageFragment = createFragment(gql`
	fragment navPage on Page {
		page_order
		title
	}
`);
const pageQuery = gql`
	query chapterQuery ($pageOrder: Int!, $nextPageOrder: Int!, $prevPageOrder: Int!, $chapterOrder: Int!) {
		store {
      chapter(chapter_order: $chapterOrder) {
				chapter_order
        tutorial_id
      }
      page(page_order: $pageOrder) {
        id
        title
        chapter_id
        body
        page_order
      }
			prevPage: page(page_order: $prevPageOrder) {
				...navPage
			}
			nextPage: page(page_order: $nextPageOrder) {
				...navPage
			}
		}
	}
`;

const PageWithData = graphql(pageQuery, {
  options: ({params}) => ({
    variables: {
      pageOrder: params.pageOrder,
			prevPageOrder: String(Number(params.pageOrder) - 1),
			nextPageOrder: String(Number(params.pageOrder) + 1),
      chapterOrder: params.chapterOrder
    },
		fragments: navPageFragment,
  }),
  props: ({data}) => ({
    page: !data.loading ? data.store.page : {},
		prevPage: !data.loading ? data.store.prevPage : {},
		nextPage: !data.loading ? data.store.nextPage : {},
    chapter: !data.loading ? data.store.chapter : {}
  }),
})(Page);

export default PageWithData;
