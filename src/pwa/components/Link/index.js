/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';

class Link extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    page: PropTypes.number,
    context: PropTypes.shape({}),
    method: PropTypes.string,
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
  };

  static defaultProps = {
    page: null,
    method: 'push',
    context: null,
  };

  constructor() {
    super();

    this.linkClicked = this.linkClicked.bind(this);
  }

  linkClicked(e) {
    // ignore click for new tab / new window behavior
    if (
      e.currentTarget.nodeName === 'A' &&
      (e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2))
    )
      return;

    e.preventDefault();

    const { routeChangeRequested, type, id, page, context, method } = this.props;

    routeChangeRequested({
      selectedItem: { type, id, page },
      context,
      method,
    });
  }

  render() {
    const { children, href } = this.props;
    return React.cloneElement(children, { onClick: this.linkClicked, href });
  }
}

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default compose(
  inject(({ connection }, { type, id, page }) => ({
    href: page ? connection.entity(type, id).pagedLink(page) : connection.entity(type, id).link,
  })),
  connect(null, mapDispatchToProps),
)(Link);
