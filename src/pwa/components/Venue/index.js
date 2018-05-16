import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Top from './Top';
import Slider from '../Slider';
import VenueMap from './VenueMap';
import MilkyWay from './MilkyWay';
import Andromeda from './Andromeda';
import Hayabusa from './Hayabusa';
import Cassini from './Cassini';
import Rosetta from './Rosetta';
import Nav from './Nav';

const Venue = ({ columns, selectedColumnIndex, handleOnTransitionEnd }) => (
  <Fragment>
    <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={handleOnTransitionEnd}>
      {columns.map(({ selectedItem: { id, mstId } }) => {
        if (id === 23) return <VenueMap key={mstId} />;
        if (id === 26) return <MilkyWay key={mstId} />;
        if (id === 28) return <Andromeda key={mstId} />;
        if (id === 30) return <Hayabusa key={mstId} />;
        if (id === 32) return <Cassini key={mstId} />;
        return <Rosetta key={mstId} />;
      })}
    </Slider>
    <Top />
    <Nav />
  </Fragment>
);

Venue.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  handleOnTransitionEnd: PropTypes.func.isRequired,
};

export default Venue;
