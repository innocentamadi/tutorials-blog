import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
//import * as actions from '../../../actions/tutorialActions';
import ListPage from './ListPage';

export class Tutorials extends Component {
  static propTypes = {
    tutorials: PropTypes.array
  }

  render() {
    return (
      <ListPage {...this.props} />
    );
  }
}

const allTutorialsQuery = gql`
	query MyQuery {
		store {
			allTutorials {
				tutorials {
					id
					title
          featured_image_url
          description
          authorsConnection {
            authors {
              id
              user {
                first_name
                last_name
              }
            }
          }
				}
			}
		}
	}
`;

const TutorialsWithData = graphql(allTutorialsQuery, {
  props: ({data, ownProps}) => ({
    tutorials: !data.loading ? data.store.allTutorials.tutorials : {},
  }),
})(Tutorials);

const mapStateToProps = (state, ownProps) => {
  try {
    const { tutorials } = state;
    return { tutorials };
  } catch(e) {
    return {}
  }
}


export default connect(mapStateToProps)(TutorialsWithData);
