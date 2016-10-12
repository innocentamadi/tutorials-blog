import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router';
import {objectWithMinValue} from '../../../utils/enumsHelpers.js';

const ChapterBody = ({chapter, pages}) =>
  <div className="page-wrapper">
    <img src={chapter.featured_image_url} />

    <div>
      <ReactMarkdown 
        source={chapter.description}
        htmlMode='raw' />
    </div>

    <div className="button-wrapper">
      <Link to={`/tutorials/${chapter.tutorial_id}`} 
        className="btn btn-default red">
        {'<--- Back to course intro'}
      </Link>
      <Link to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.chapter_order}/pages/1`} 
        className="btn btn-default green">
        {'Start chapter --->'}
      </Link>
    </div>
  </div>

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object
  }

  static defaultProps = {
    chapter: {}
  }

  render() {
    const {children, chapter} = this.props;
    return (
      <div>
        <div className="chapter-wrapper">
          <h4>
            <span>
              Chapter {chapter.chapter_order}:
            </span>
            {chapter.title}
          </h4>
        </div>
        {children ? children : <ChapterBody {...{chapter}} />}
      </div>
    )
  }
}

const chapterQuery = gql`
	query pageQuery ($chapterOrder: Int!) {
		store {
      chapter(chapter_order: $chapterOrder) {
        id
        title
        tutorial_id
        featured_image_url
        description
				chapter_order
      }
		}
	}
`;

const ChapterWithData = graphql(chapterQuery, {
  options: ({params}) => ({
    variables: {chapterOrder: params.chapterOrder}
  }),
  props: ({data}) => ({
    chapter: !data.loading ? data.store.chapter : {},
  }),
})(Chapter);

const mapStateToProps = (state, ownProps) => {
	return {}
}

export default connect(mapStateToProps)(ChapterWithData);
