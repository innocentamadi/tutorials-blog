import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import TutorialSidebar from './TutorialSidebar';
import Authors from './Authors';
import {createFragment} from 'apollo-client';
import isEmpty from '../../utils/isEmpty.js';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const Sidebar = ({tutorial, authors}) => 
    <div className="sidebar">
      <div className="sidebar-wrapper left-sidebar">
        <div className="left-sidebar-content">
          {authors && <Authors {...{authors}} />}
        </div>
        {tutorial && <TutorialSidebar {...{tutorial}} />}
      </div>
    </div>

Sidebar.propTypes = {
  tutorial: PropTypes.object
};

Sidebar.defaultProps = {
};

const authorFragment = createFragment(gql`
  fragment authorFragment on Author {
    id
    user_id
    user {
      first_name
      last_name
    }
  }
`);

const sidebarQuery = gql`
	query sidebarQuery ($tutorialId: ID!, $withinTutorial: Boolean!) {
		store {
      tutorial(id: $tutorialId) @include(if: $withinTutorial) {
        id
        title
        chaptersConnection {
          chapters {
            title
            tutorial_id
            chapter_order
            pagesConnection {
              pages {
                title
                page_order
              }
            }
          }
        }
        authorsConnection {
          authors {
            ...authorFragment
          }
        }
      }
      allAuthors @skip(if: $withinTutorial) {
        authors {
          ...authorFragment
        }
      }
		}
	}
`;

const SidebarWithData = graphql(sidebarQuery, {
  options: ({params: {tutorialId}}) => ({
    variables: {
      tutorialId: tutorialId || 0,
      withinTutorial: !isEmpty(tutorialId)
    },
    fragments: authorFragment
  }),
  props: ({data: {store}}) => {
    if (!store) return;
    return {
      tutorial: store.tutorial,
      authors: store.allAuthors ? store.allAuthors.authors : store.tutorial.authorsConnection.authors
    }
  },
})(Sidebar);

export default SidebarWithData;
