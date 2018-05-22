import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';
import Share from '../Share';

const Nav = ({ hasPreviousColumn, previousColumn, hasNextColumn, nextColumn }) => (
  <Container>
    {hasPreviousColumn ? (
      <PreviousButton>
        <Link type={previousColumn.items[0].type} id={previousColumn.items[0].id}>
          <PreviousA>{'<'}</PreviousA>
        </Link>
      </PreviousButton>
    ) : null}
    <Share />
    {hasNextColumn ? (
      <NextButton>
        <Link type={nextColumn.items[0].type} id={nextColumn.items[0].id}>
          <NextA>{'>'}</NextA>
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
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: ${({ theme }) => theme.size.button};
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
