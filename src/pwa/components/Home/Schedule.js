import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Select from 'react-select';
import FilterFavorites from './FilterFavorites';
import SessionList from './SessionList';

const selectStyles = {
  container: base => ({
    ...base,
    width: '80vw',
    height: '54px',
    marginTop: '20px',
  }),
  control: base => ({
    ...base,
    height: '54px',
  }),
};

const Schedule = ({ options, selected, selectTrack }) => (
  <Container>
    <Select
      styles={selectStyles}
      value={{ value: selected.name, label: selected.name }}
      onChange={selectTrack}
      isClearable={false}
      isSearchable={false}
      options={options.map(({ name }) => ({
        value: name,
        label: name,
      }))}
    />
    <FilterFavorites />
    <SessionList track={selected.id} />
  </Container>
);

Schedule.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.shape({}).isRequired,
  selectTrack: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  options: theme.schedule.options,
  selected: theme.schedule.selected,
  selectTrack: ({ value }) => {
    theme.schedule.selectTrack(value);
  },
}))(Schedule);

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
