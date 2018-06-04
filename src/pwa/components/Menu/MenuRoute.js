import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { venueContext, announcementsContext, pageContext } from '../../contexts';
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
    text: 'Announcements',
  },
  menus: {
    type: 'page',
    id: 78,
    context: pageContext({ id: 78, title: 'Menus' }),
  },
  'code-of-conduct': {
    type: 'page',
    id: 76,
    context: pageContext({ id: 76, title: 'Code of Conduct' }),
  },
};

const MenuRoute = ({ type, id, page, context, text, closeMenu }) => (
  <Container onClick={closeMenu}>
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
  closeMenu: PropTypes.func.isRequired,
};

MenuRoute.defaultProps = {
  page: null,
};

export default inject(({ connection, theme }, { name }) => {
  const { type, id, page, context, text } = routes[name];

  return {
    type,
    id,
    page,
    context,
    text: connection.entity(type, id).title || text,
    closeMenu: theme.menu.close,
  };
})(MenuRoute);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  box-shadow: inset 0 -1px 0 0 rgba(40, 36, 9, 0.1);
  font-size: 20px;
  line-height: 20px;
`;

const A = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  padding: 16px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
`;
