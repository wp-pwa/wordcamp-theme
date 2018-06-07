import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const AnnouncementsCount = ({ count }) => (count ? <Container>{count}</Container> : null);

AnnouncementsCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default inject(({ theme }) => ({
  count: theme.announcements.totalNew,
}))(AnnouncementsCount);

const Container = styled.span`
  position: absolute;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  width: 16px;
  font-size: 10px;
  line-height: 16px;
  border-radius: 50%;
  top: 8px;
  right: 8px;
`;
