import React, { PropTypes, Component } from 'react';
import Tutorials from '../tutorials/list/Index';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Tutorials />
      </div>
    );
  }
}

export default HomePage;
