import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { venueContext, announcementsContext, creditsContext } from '../../contexts';
import Link from '../Link';

const routes = {
  'venue-map': {
    type: 'page',
    id: 23,
    context: venueContext,
  },
  announcements: {
    type: 'latest',
    id: 'post',
    page: 1,
    context: announcementsContext,
  },
  credits: {
    type: 'page',
    id: 36,
    context: creditsContext,
  },
};

const MenuRoute = ({ type, id, page, context, text }) => (
  <Container>
    <Link type={type} id={id} page={page} context={context}>
      <A>{text}</A>
    </Link>
  </Container>
);

MenuRoute.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number,
  context: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
};

MenuRoute.defaultProps = {
  page: null,
};

export default inject(({ connection }, { name }) => {
  const { type, id, page, context } = routes[name];

  return {
    type,
    id,
    page,
    context,
    text: connection.entity(type, id).title,
  };
})(MenuRoute);

const Container = styled.div`
  height: ${({ theme }) => theme.sizes.button};
  padding: ${({ theme }) => theme.paddings.menu};
`;

const A = styled.a`
  height: ${({ theme }) => theme.sizes.button};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
