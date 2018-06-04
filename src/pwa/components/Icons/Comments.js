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
      d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.4 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.1 2.1 18.4 3.7 28 4.8 31.5 57.5 105.5 98 191.8 98 20.8 0 40.8-2.4 59.8-6.8 28.5 18.5 71.6 38.8 125.2 38.8 9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.5-.4-22.6-24.2-37.9-54.9zM142.2 311l-11.4 7.4c-20.1 13.1-50.5 28.2-87.7 32.5 8.8-11.3 20.2-27.6 29.5-46.4L83 283.7l-16.5-16.3C50.7 251.9 32 226.2 32 192c0-70.6 79-128 176-128s176 57.4 176 128-79 128-176 128c-17.7 0-35.4-2-52.6-6l-13.2-3zm303 103.4l-11.4-7.4-13.2 3.1c-17.2 4-34.9 6-52.6 6-65.1 0-122-25.9-152.4-64.3C326.9 348.6 416 278.4 416 192c0-9.5-1.3-18.7-3.3-27.7C488.1 178.8 544 228.7 544 288c0 34.2-18.7 59.9-34.5 75.4L493 379.7l10.3 20.7c9.4 18.9 20.8 35.2 29.5 46.4-37.1-4.2-67.5-19.4-87.6-32.4zm-37.8-267.7c.1.2.1.4.2.6-.1-.2-.1-.4-.2-.6z"
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
