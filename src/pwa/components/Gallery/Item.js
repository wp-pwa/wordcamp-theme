import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { noop } from 'lodash';
import Image from '../Image';

const Item = ({ alt, sizes, src, srcset, onClick }) => (
  <Container onClick={onClick}>
    <Image
      lazy
      offsetHorizonal={30}
      alt={alt}
      sizes={sizes}
      src={src}
      srcset={srcset}
      width="40vmin"
      height="100%"
    />
  </Container>
);

Item.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  srcset: PropTypes.string,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  alt: '',
  sizes: null,
  srcset: null,
  onClick: noop,
};

export default inject(() => ({
  Link: dep('connection', 'components', 'Link'),
}))(Item);

const Container = styled.li`
  box-sizing: border-box;
  width: 40vmin;
  height: 100%;
  margin-right: 1.5vmin;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;
