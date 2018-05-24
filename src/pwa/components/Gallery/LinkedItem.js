import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Image from '../Image';

const Item = ({ id, Link, context }) => (
  <Container className="gallery">
    <Link type="media" id={id} context={context} eventCategory="Post" eventAction="open media">
      <a>
        <Image lazy offsetHorizonal={30} id={id} width="40vmin" height="100%" />
      </a>
    </Link>
  </Container>
);

Item.propTypes = {
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
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
