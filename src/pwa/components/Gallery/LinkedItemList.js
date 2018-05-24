import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import LinkedItem from './LinkedItem';
import { media } from '../../../pwa/contexts';

const LinkedItemList = ({ ready, mediaIds, context }) => {
  const items = mediaIds.map(id => <LinkedItem key={id} id={id} context={context} />);

  return <InnerContainer>{(ready && <List>{items}</List>) || null}</InnerContainer>;
};

LinkedItemList.propTypes = {
  mediaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  ready: PropTypes.bool.isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default inject(({ connection }, { ssr, name, mediaIds }) => ({
  ready: !ssr && connection.custom(name).isReady,
  context: media(mediaIds),
}))(LinkedItemList);

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0 !important;
  padding: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
