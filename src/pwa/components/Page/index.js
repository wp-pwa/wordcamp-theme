import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Content from '../Content';

const Page = ({ content }) => (
  <Container>
    <ContentContainer>
      <Content content={content} padding={24} />
    </ContentContainer>
  </Container>
);

Page.propTypes = {
  content: PropTypes.string.isRequired,
};

export default inject((_, { entity }) => ({
  content: entity.content,
}))(Page);

const Container = styled.div`
  box-sizing: border-box;
  padding: 56px 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ContentContainer = styled.div`
  margin: 24px 0 8px 0;
`;
