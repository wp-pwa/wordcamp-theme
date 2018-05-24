import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const XofY = ({ x, y }) => (
  <Container>
    <Number align="right">{x}</Number>
    <Bar>/</Bar>
    <Number align="left">{y}</Number>
  </Container>
);

XofY.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default XofY;

const Container = styled.div`
  z-index: 51;
  box-sizing: border-box;
  width: calc(100vw - (2 * ${({ theme }) => theme.heights.bar}));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Number = styled.div`
  width: 3em;
  line-height: 100%;
  text-align: ${({ align }) => (align === 'left' ? 'left' : 'right')};
`;

const Bar = styled.div`
  width: 1em;
  line-height: 100%;
  text-align: center;
`;
