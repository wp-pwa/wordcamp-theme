import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Comments = ({ size, inCard }) => (
  <Svg
    size={size}
    inCard={inCard}
    aria-hidden="true"
    data-prefix="fal"
    data-icon="comments"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    className="svg-inline--fa fa-comments fa-w-18"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
    />
  </Svg>
);

Comments.propTypes = {
  size: PropTypes.number.isRequired,
  inCard: PropTypes.bool.isRequired,
};

export default Comments;

const Svg = styled.svg`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  color: ${({ theme, inCard }) => (inCard ? theme.color.blue : theme.color.black)};
  ${({ inCard }) => (inCard ? 'margin-right: 12px' : null)};
`;
