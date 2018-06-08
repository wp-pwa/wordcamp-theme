import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Page from './Page';
import Nav from '../Nav';

class Pages extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { selectedItem } = this.props;

    return (
      <Fragment>
        <Page key={selectedItem.mstId} entity={selectedItem.entity} />
        <Nav />
      </Fragment>
    );
  }
}

Pages.propTypes = {
  selectedItem: PropTypes.shape({}).isRequired,
};

export default inject(({ connection }) => ({
  selectedItem: connection.selectedItem,
}))(Pages);
