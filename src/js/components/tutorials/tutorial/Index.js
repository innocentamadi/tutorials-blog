import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import * as actions from '../../../actions/tutorialActions';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router';

const firstChapter = chapters => chapters ? 
   chapters.reduce((prev, curr) => 
    prev.chapter_order < curr.chapter_order ? prev : next) :
    {};

const TutorialBody = ({tutorial, chapters}) =>
  <div className="page-wrapper">
    <img src={tutorial.featured_image_url} />

    <div>
      <ReactMarkdown 
        source={tutorial.description}
        htmlMode='raw' />
    </div>

    <div className="button-wrapper">
      <Link to="/" 
        className="btn btn-default red">
        {'<--- Back to list of tutorials'}
      </Link>
      <Link to={`/tutorials/${tutorial.id}/chapters/${firstChapter(chapters).id}`} 
        className="btn btn-default green">
        {'Continue to first chapter --->'}
      </Link>
    </div>
  </div>

class Tutorial extends React.Component {
  static propTypes = {
    tutorial: PropTypes.object
  }

  static defaultProps = {
    tutorial: {}
  }

  render() {
    const {children, tutorial, chapters} = this.props;
    return (
      <div className="panel-container tutorial-page">
        <div className="topic-wrapper">
          <h3>
            <span>
              Title: 
            </span>
            {tutorial.title}
          </h3>
        </div>
      {children ? children : <TutorialBody {...{tutorial, chapters}} />}
      </div>
    )
  }
}

const tutorialQuery = gql`
	query MyQuery ($id: ID!) {
		store {
      tutorial(id: $id) {
        id
        title
        featured_image_url
        description
        chaptersConnection {
          chapters {
            id
            chapter_order
          }
        }
        author {
          id
          user {
            first_name
            last_name
          }
        }
      }
		}
	}
`;

const TutorialWithData = graphql(tutorialQuery, {
  options: ({params}) => ({
    variables: {id: params.tutorialId}
  }),
  props: ({data}) => ({
    tutorial: !data.loading ? data.store.tutorial : {},
    chapters: !data.loading ? data.store.tutorial.chaptersConnection.chapters : null
  }),
})(Tutorial);

const mapStateToProps = (state, ownProps) => {
  try {
    const { tutorials } = state;
    return { tutorials };
  } catch(e) {
    return {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorialWithData);
