import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import Home from '../Home';
import Sessions from '../Sessions';
import Speakers from '../Speakers';
import Venue from '../Venue';
import Announcements from '../Announcements';
import Credits from '../Credits';
import Manifest from '../Manifest';

import '../../styles';

const theme = {
  color: {
    black: '#282409',
    grey: '#E9E9E6',
    darkGrey: '#A9A79C',
    switch: '#9B998E',
    red: '#F95758',
    yellow: '#EFDC39',
    blue: '#5566C3',
    facebook: '#3b5998',
    twitter: '#1da1f2',
    whatsapp: '#2cb742',
    email: '#7f7f7f',
    share: '#006ca0',
    text: '#282409',
  },
  sizes: {
    button: '56px',
  },
  padding: {
    menuItem: '16px 24px',
    venueNav: '0 15px',
    venue: '56px 0',
    credits: '56px 0 0 0',
    schedule: '0 0 0 15px',
    session: '56px 0',
    speaker: '56px 0',
    home: '56px 0 76px 0',
  },
};

class Theme extends Component {
  constructor() {
    super();
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
  }

  handleOnTransitionEnd({ index, fromProps }) {
    if (fromProps) return;
    const { routeChangeRequested, columns } = this.props;
    const { type, id } = columns[index].selectedItem;
    routeChangeRequested({
      selectedItem: {
        type,
        id,
      },
      method: 'push',
    });
  }

  render() {
    const { contextName, columns, selectedColumnIndex } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Manifest />
          {contextName === 'home' && (
            <Home
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'sessions' && (
            <Sessions
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'speakers' && (
            <Speakers
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'venue' && (
            <Venue
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'announcements' && <Announcements />}
          {contextName === 'credits' && <Credits />}
        </Fragment>
      </ThemeProvider>
    );
  }
}

Theme.propTypes = {
  contextName: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  routeChangeRequested: PropTypes.func.isRequired,
};

export default compose(
  inject(({ connection }) => ({
    routeChangeRequested: connection.routeChangeRequested,
    contextName: connection.selectedContext.options.name,
    columns: connection.selectedContext.columns,
    selectedColumnIndex: connection.selectedColumn.index,
  })),
)(Theme);
