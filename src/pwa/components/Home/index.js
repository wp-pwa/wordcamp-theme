import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import OnNow from './OnNow';
import UpNext from './UpNext';
import Schedule from './Schedule';
import TopBar from '../TopBar';
import Menu from '../Menu';
import Nav from './Nav';

const Home = ({ columns, selectedColumnIndex, handleOnTransitionEnd }) => (
  <Fragment>
    <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={handleOnTransitionEnd}>
      {columns.map(({ selectedItem: { id, mstId } }) => {
        if (id === 13) return <OnNow key={mstId} />;
        if (id === 15) return <UpNext key={mstId} />;
        return <Schedule key={mstId} />;
      })}
    </Slider>
    <TopBar />
    <Menu key="menu" />
    <Nav key="nav" />
  </Fragment>
);

Home.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  handleOnTransitionEnd: PropTypes.func.isRequired,
};

export default Home;
