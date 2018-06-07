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
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  padding: 2px 4px;
  height: 24px;
  width: 24px;
  line-height: 20px;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
  margin-left: 8px;
`;
