import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

const mapStateToProps = (state, ownProps) => {
  const { proverbs } = state;
  return { proverbs };
}



export default connect(mapStateToProps)(Tutorials);
