import React from 'react';
import PropTypes from 'prop-types';
import Bullhorn from './Bullhorn';
import Comments from './Comments';
import Utensils from './Utensils';

const Icon = ({ title, size }) => {
  if (title === 'Lunch') return <Utensils size={size} />;
  if (title === 'Open networking') return <Comments size={size} />;
  return <Bullhorn size={size} />;
};

Icon.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 24,
};

export default Icon;
