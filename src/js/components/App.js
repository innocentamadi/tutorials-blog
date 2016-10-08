import React, { PropTypes, Component } from 'react';
import Header from '../components/header/Index';
import SideNav from '../components/sidebar/Index';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {bindActionCreators} from 'redux';
import Relay from 'react-relay';
import {graphql} from 'react-apollo'

class App extends Component {
  render() {
	console.log(this.props.data);
   return (
      <div className="wrapper">
        <Header />
				<div className="content-wrapper">
					<SideNav />
					<div className="main-content">
						<div className="container">
							{this.props.children}
						</div>
					</div>
				</div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

const allTutorialsQuery = gql`
	query MyQuery {
		store {
			id
			allTutorials {
				tutorials {
					id
					title
				}
			}
		}
	}
`;

const mapQueriesToProps = (ownProps, state) => {
	return {
	}
};

const AppWithData = graphql(allTutorialsQuery)(App);

export default connect(mapQueriesToProps)(AppWithData);
