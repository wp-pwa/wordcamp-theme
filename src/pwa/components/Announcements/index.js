import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Card from './Card';
import Refresh from './Refresh';
import NextPage from './NextPage';
import { postsContext } from '../../contexts';

const Announcements = ({ entities, list }) => {
  const context = postsContext(entities.map(({ type, id }) => [{ type, id }]));
  return (
    <Fragment>
      <Container>
        <Refresh list={list} />
        {entities.map(entity => <Card key={entity.mstId} entity={entity} context={context} />)}
        <NextPage list={list} />
      </Container>
    </Fragment>
  );
};

Announcements.propTypes = {
  entities: PropTypes.shape({}).isRequired,
  list: PropTypes.shape({}).isRequired,
};

export default inject(({ connection }) => ({
  entities: connection.list('latest', 'post').entities,
  list: connection.list('latest', 'post'),
}))(Announcements);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 56px 0 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
