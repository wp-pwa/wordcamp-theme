import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { keyframes } from 'react-emotion';
import FetchingIcon from 'react-icons/lib/fa/refresh';

class Refresh extends Component {
  constructor() {
    super();
    this.state = { isClicked: false };
    this.getFirstPage = this.getFirstPage.bind(this);
    this.unclick = this.unclick.bind(this);
  }
  componentDidMount() {
    this.getFirstPage();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  getFirstPage() {
    const { type, id, fetchListPage, isFetching } = this.props;
    if (!isFetching) fetchListPage({ type, id, page: 1, force: true });
    this.setState({ isClicked: true });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.unclick, 500);
  }
  unclick() {
    this.setState({ isClicked: false });
  }
  render() {
    const { isFetching } = this.props;
    const { isClicked } = this.state;
    return (
      <Container>
        <Button onClick={this.getFirstPage}>
          {isFetching || isClicked ? <Fetching /> : 'Refresh'}
        </Button>
      </Container>
    );
  }
}

Refresh.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchListPage: PropTypes.func.isRequired,
};

export default inject(({ connection }, { list }) => ({
  type: list.type,
  id: list.id,
  isFetching: list.isFetching,
  fetchListPage: connection.fetchListPage,
}))(Refresh);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  box-sizing: border-box;
  width: 96px;
  height: 32px;
  color: white;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  background: #5566c3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Fetching = styled(FetchingIcon)`
  width: 24px;
  height: 24px;
  color: white;
  animation: ${spinner} 1s ease infinite;
`;
