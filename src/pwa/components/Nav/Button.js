import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from '../Link';

const Button = ({ item, icon: Icon, text }) =>
  item ? (
    <Link type={item.type} id={item.id}>
      <Container>
        <ButtonSymbol>
          <Icon size={20} />
        </ButtonSymbol>
        <ButtonText>{text}</ButtonText>
      </Container>
    </Link>
  ) : null;

Button.propTypes = {
  item: PropTypes.shape({}).isRequired,
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;

const Container = styled.div`
  box-sizing: padding-box;
  width: ${({ theme }) => theme.size.button};
  height: ${({ theme }) => theme.size.button};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonSymbol = styled.div`
  box-sizing: content-box;
  padding: 12px 18px 2px 18px;
  width: 20px;
  height: 20px;

  & > * {
    display: block;
  }
`;

const ButtonText = styled.div`
  text-align: center;
  line-height: 12px;
  font-size: 10px;
`;
