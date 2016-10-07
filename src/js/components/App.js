import React, { PropTypes, Component } from 'react';
import Header from '../components/header/Index';
import SideNav from '../components/sidebar/Index';
import Relay from 'react-relay';

class App extends Component {
  render() {
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

export default App;
