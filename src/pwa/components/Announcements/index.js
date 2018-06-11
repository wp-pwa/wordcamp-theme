import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Card from './Card';
import PullToRefresh from '../PullToRefresh';
import NextPage from './NextPage';
import { postsContext } from '../../contexts';

class Announcements extends Component {
  constructor() {
    super();

    this.getCurrentPages = this.getCurrentPages.bind(this);
  }

  componentDidMount() {
    this.getCurrentPages();
  }

  getCurrentPages() {
    const { type, id, fetchListPage, isFetching, fetchedPages } = this.props;

    if (!isFetching) {
      for (let i = 1; i <= fetchedPages; i += 1) {
        fetchListPage({ type, id, page: i, force: true });
      }
    }
  }

  render() {
    const { entities, list, context } = this.props;
    return (
      <Container>
        <PullToRefresh onInit={this.getCurrentPages} onRefresh={this.getCurrentPages}>
          {entities.map(entity => <Card key={entity.mstId} entity={entity} context={context} />)}
        </PullToRefresh>
        <NextPage list={list} />
      </Container>
    );
  }
}

Announcements.propTypes = {
  entities: PropTypes.shape({}).isRequired,
  list: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchListPage: PropTypes.func.isRequired,
  fetchedPages: PropTypes.number,
};

Announcements.defaultProps = {
  fetchedPages: 0,
};

export default inject(({ connection }) => {
  const { entities } = connection.list('latest', 'post');
  const list = connection.list('latest', 'post');

  return {
    entities,
    list,
    context: postsContext(entities.map(({ type, id }) => [{ type, id }])),
    type: list.type,
    id: list.id,
    isFetching: list.isFetching,
    fetchListPage: connection.fetchListPage,
    fetchedPages: list.total.fetched.pages,
  };
})(Announcements);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 56px 0 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
