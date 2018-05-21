import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';

const Media = ({ alt, src }) => (
  <Img alt={alt} src={src} />
);

Media.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default inject((_, { entity }) => ({
  alt: entity.alt,
  src: entity.original.url,
}))(Media);

const Img = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 56px;
`;
