import React from 'react';
import styled from 'react-emotion';
import MenuRoute from './MenuRoute';
import MenuLink from './MenuLink';

const routes = ['venue-map', 'announcements', 'menus', 'code-of-conduct'];
const links = ['facebook', 'twitter'];

const MenuList = () => (
  <Container>
    {routes.map(route => <MenuRoute key={route} name={route} />)}
    {links.map(link => <MenuLink key={link} name={link} />)}
  </Container>
);

export default MenuList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
