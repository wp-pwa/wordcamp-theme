import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import TopBar from '../TopBar';

const Credits = ({ title, content }) => (
  <Fragment>
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
    <TopBar />
  </Fragment>
);

Credits.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  title: connection.selectedItem.entity.title,
  content: connection.selectedItem.entity.content,
}))(Credits);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.paddings.credits};
`;

const Title = styled.h1`
  text-align: center;
`;

const Content = styled.section`
  padding: 0 15px;
`;
