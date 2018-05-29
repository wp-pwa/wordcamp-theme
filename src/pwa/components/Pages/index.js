import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import Page from './Page';
import TopBar from '../TopBar';
import Nav from '../Nav';

const Pages = ({ columns, selectedColumnIndex, handleOnTransitionEnd }) => (
  <Fragment>
    <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={handleOnTransitionEnd}>
      {columns.map(({ index, selectedItem }) => {
        if (index > selectedColumnIndex + 1) return <div key={selectedItem.mstId} />;
        if (index < selectedColumnIndex - 1) return <div key={selectedItem.mstId} />;

        return <Page key={selectedItem.mstId} entity={selectedItem.entity} />;
      })}
    </Slider>
    <TopBar />
    <Nav />
  </Fragment>
);

Pages.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  handleOnTransitionEnd: PropTypes.func.isRequired,
};

export default Pages;
