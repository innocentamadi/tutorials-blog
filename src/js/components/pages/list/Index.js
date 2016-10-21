import React, { PropTypes, Component } from 'react';
import ListPage from './ListPage';

export class Tutorials extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListPage {...this.props} />
    );
  }
}

Tutorials.propTypes = {
  proverbs: PropTypes.object
};

export default Tutorials;
