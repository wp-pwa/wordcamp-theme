import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Lightbox from 'react-image-lightbox';
import Item from './Item';
import XofY from '../XofY';

import '../../styles/lightbox';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaIndex: 0,
      isOpen: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  open(index) {
    this.setState({
      mediaIndex: index,
      isOpen: true,
    });
  }

  close() {
    this.setState({ isOpen: false });
  }

  previous() {
    const { length } = this.props.mediaAttributes;
    const { mediaIndex } = this.state;
    this.setState({
      mediaIndex: (mediaIndex + length - 1) % length,
    });
  }

  next() {
    const { length } = this.props.mediaAttributes;
    const { mediaIndex } = this.state;
    this.setState({
      mediaIndex: (mediaIndex + 1) % length,
    });
  }

  render() {
    const { mediaIndex, isOpen } = this.state;
    const { mediaAttributes } = this.props;
    const { length } = mediaAttributes;
    const mediaSrc = mediaAttributes.map(({ src }) => src);
    const items = mediaAttributes.map(({ alt, sizes, src, srcset }, index) => (
      <Item
        onClick={() => this.open(index)}
        key={src}
        alt={alt}
        sizes={sizes}
        src={src}
        srcset={srcset}
      />
    ));

    return (
      <InnerContainer>
        <List>{items}</List>
        {isOpen && (
          <Lightbox
            wrapperClassName="lightbox"
            enableZoom={false}
            imageTitle={
              <Header>
                <XofY x={mediaIndex + 1} y={length} />
              </Header>
            }
            mainSrc={mediaSrc[mediaIndex]}
            nextSrc={mediaSrc[(mediaIndex + 1) % length]}
            prevSrc={mediaSrc[(mediaIndex + length - 1) % length]}
            onCloseRequest={this.close}
            onMovePrevRequest={this.previous}
            onMoveNextRequest={this.next}
            reactModalStyle={{
              overlay: {
                backgroundColor: '#0e0e0e',
              },
              content: {
                outline: 'none !important',
              },
            }}
          />
        )}
      </InnerContainer>
    );
  }
}

ItemList.propTypes = {
  mediaAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ItemList;

const InnerContainer = styled.div`
  height: 40vmin;
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

const Header = styled.div`
  position: fixed;
  top: 0;
  left: ${({ theme }) => theme.heights.bar};
  height: ${({ theme }) => theme.heights.bar};
  width: calc(100vw - (2 * ${({ theme }) => theme.heights.bar}));
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;
