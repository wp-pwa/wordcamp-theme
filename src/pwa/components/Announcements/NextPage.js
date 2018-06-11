import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { keyframes } from 'react-emotion';
import Waypoint from 'react-waypoint';
import FetchingIcon from 'react-icons/lib/fa/refresh';

class NextPage extends Component {
  constructor() {
    super();
    this.getNextPage = this.getNextPage.bind(this);
  }

  state = { isFetching: false };

  async getNextPage() {
    const { type, id, fetchedPages, totalPages, fetchListPage } = this.props;

    if (!this.state.isFetching && totalPages && fetchedPages < totalPages) {
      this.setState({ isFetching: true });
      await fetchListPage({ type, id, page: fetchedPages + 1 });
      this.setState({ isFetching: false });
    }
  }

  render() {
    const { fetchedPages, totalPages } = this.props;
    const { isFetching } = this.state;

    return fetchedPages < totalPages || (fetchedPages === totalPages && isFetching) ? (
      <Waypoint onEnter={this.getNextPage} bottomOffset={-200} scrollableAncestor="window">
        <Container>{isFetching ? <Fetching /> : null}</Container>
      </Waypoint>
    ) : null;
  }
}

NextPage.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fetchedPages: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  fetchListPage: PropTypes.func.isRequired,
};

export default inject(({ connection }, { list }) => ({
  type: list.type,
  id: list.id,
  fetchedPages: list.total.fetched.pages || 0,
  totalPages: list.total.pages || 0,
  fetchListPage: connection.fetchListPage,
}))(NextPage);

const spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Fetching = styled(FetchingIcon)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.color.blue};
  animation: ${spinner} 1s ease infinite;
`;
