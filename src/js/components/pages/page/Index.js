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

const NavButtons = ({
	chapter, 
	page, 
	prevPage, 
	nextPage,
	prevChapter,
	nextChapter,
}) => {
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
          className="btn btn-inverted-red">
          {'Next page >>'}
        </Link> :
				nextChapter ?
					<Link to={`/tutorials/${chapter.tutorial_id}/chapters/${nextChapter.chapter_order}`} 
						className="btn btn-inverted-red">
						{'Proceed to next chapter >>'}
					</Link> :
					<Link to={`/tutorials`} 
						className="btn btn-inverted-red">
						{'Back to all tutorials >>'}
					</Link>
				}
    </div>
  )
}

const Page = ({
	chapter, 
	page, 
	prevPage, 
	nextPage,
	prevChapter,
	nextChapter,
}) => {
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
        {chapter && 
					<NavButtons {...{
						chapter, page, prevPage, 
						nextPage, prevChapter, nextChapter}} />}
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

const navChapterFragment = createFragment(gql`
	fragment navChapter on Chapter {
		chapter_order
	}
`);

const pageQuery = gql`
	query chapterQuery ($pageOrder: Int!, $nextPageOrder: Int!, $prevPageOrder: Int!, $chapterOrder: Int!, $prevChapterOrder: Int!, $nextChapterOrder: Int!, $tutorialId: ID!) {
		store {
			tutorial(id: $tutorialId) {
				chapter(chapter_order: $chapterOrder) {
					chapter_order
					tutorial_id

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
				prevChapter: chapter(chapter_order: $prevChapterOrder) {
					...navChapter
				}
				nextChapter: chapter(chapter_order: $nextChapterOrder) {
					...navChapter
				}
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
      chapterOrder: params.chapterOrder,
			prevChapterOrder: String(Number(params.chapterOrder) - 1),
			nextChapterOrder: String(Number(params.chapterOrder) + 1),
			tutorialId: params.tutorialId,
    },
		fragments: [navPageFragment, navChapterFragment],
  }),
  props: ({data: {loading, store}}) => {
		if (loading) return {page: {}};
		const {tutorial: {chapter, prevChapter, nextChapter}} = store;
		return {
			page: chapter.page,
			prevPage: chapter.prevPage,
			nextPage: chapter.nextPage,
			chapter,
			prevChapter,
			nextChapter
		}
  },
})(Page);

export default PageWithData;
