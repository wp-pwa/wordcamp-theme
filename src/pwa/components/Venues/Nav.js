import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';

const Nav = ({ hasPreviousColumn, previousColumn, hasNextColumn, nextColumn }) => (
  <Container>
    {hasPreviousColumn ? (
      <PreviousButton>
        <Link type={previousColumn.items[0].type} id={previousColumn.items[0].id}>
          <PreviousA>{`< ${previousColumn.items[0].entity.title}`}</PreviousA>
        </Link>
      </PreviousButton>
    ) : null}
    {hasNextColumn ? (
      <NextButton>
        <Link type={nextColumn.items[0].type} id={nextColumn.items[0].id}>
          <NextA>{`${nextColumn.items[0].entity.title} >`}</NextA>
        </Link>
      </NextButton>
    ) : null}
  </Container>
);

Nav.propTypes = {
  hasPreviousColumn: PropTypes.bool.isRequired,
  previousColumn: PropTypes.shape({}),
  hasNextColumn: PropTypes.bool.isRequired,
  nextColumn: PropTypes.shape({}),
};

Nav.defaultProps = {
  previousColumn: null,
  nextColumn: null,
};

export default inject(({ connection }) => ({
  hasPreviousColumn: connection.selectedColumn.hasPreviousColumn,
  previousColumn: connection.selectedColumn.previousColumn,
  hasNextColumn: connection.selectedColumn.hasNextColumn,
  nextColumn: connection.selectedColumn.nextColumn,
}))(Nav);

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: ${({ theme }) => theme.size.button};
  background-color: #cccccc;
`;

const Button = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const PreviousButton = styled(Button)`
  left: 0;
`;

const NextButton = styled(Button)`
  right: 0;
`;

const A = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.padding.venueNav};
`;

const PreviousA = styled(A)`
  justify-content: flex-start;
`;

const NextA = styled(A)`
  justify-content: flex-end;
`;
