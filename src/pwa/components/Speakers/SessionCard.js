import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const SessionCard = ({ title }) => (
  <Card>
    <Session>SESSION</Session>
    <Title>{title}</Title>
  </Card>
);

SessionCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SessionCard;

const Card = styled.div`
  margin-top: 16px;
  padding: 16px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.lightGrey};
`;

const Session = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.blue};
`;
