import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import CardsList from './CardsList';

const OnNow = ({ sessions }) => <CardsList sessions={sessions} />;

OnNow.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }) => ({
  sessions: theme.sessionsOnNow,
}))(OnNow);
