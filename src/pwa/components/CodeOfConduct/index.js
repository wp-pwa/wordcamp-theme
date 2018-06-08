import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Page from '../Pages';
import Nav from '../Nav';

class CodeOfConduct extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { selectedItem } = this.props;

    return (
      <Fragment>
        <Page entity={selectedItem.entity} />
        <Nav />
      </Fragment>
    );
  }
}

CodeOfConduct.propTypes = {
  selectedItem: PropTypes.shape({}).isRequired,
};

export default inject(({ connection }) => ({
  selectedItem: connection.selectedItem,
}))(CodeOfConduct);
