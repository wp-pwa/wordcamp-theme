import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import CardsList from './CardsList';

const UpNext = ({ sessions }) => <CardsList sessions={sessions} />;

UpNext.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }) => ({
  sessions: theme.sessionsUpNext,
}))(UpNext);
