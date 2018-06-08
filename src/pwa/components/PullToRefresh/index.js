import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pull from 'pulltorefreshjs';

class PullToRefresh extends Component {
  constructor() {
    super();

    this.getRef = this.getRef.bind(this);
  }

  componentDidMount() {
    this.ptr = Pull.init({
      mainElement: '.pull-to-refresh',
      onRefresh: this.props.onRefresh,
    });
  }

  componentWillUnmount() {
    this.ptr.destroy();
  }

  getRef(node) {
    this.ref = node;
  }

  render() {
    return <div className="pull-to-refresh">{this.props.children}</div>;
  }
}

PullToRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default PullToRefresh;
