import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';

const routes = {
  'on-now': {
    id: 13,
    text: 'On Now',
    color: 'hotpink',
  },
  'up-next': {
    id: 15,
    text: 'Up Next',
    color: 'crimson',
  },
  schedule: {
    id: 17,
    text: 'Schedule',
    color: 'indigo',
  },
};

const NavItem = ({ label, isSelected }) => (
  <Container isSelected={isSelected} label={label}>
    <Link type="page" id={routes[label].id}>
      <A>{routes[label].text}</A>
    </Link>
  </Container>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default inject(({ connection }, { label }) => ({
  isSelected: connection.selectedContext.getItem({ item: { type: 'page', id: routes[label].id } })
    .isSelected,
}))(NavItem);

const Container = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: 33%;
  background-color: ${({ isSelected, label }) => (isSelected ? routes[label].color : '')};
`;

const A = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
