import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { injectGlobal } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import Home from '../Home';
import Venue from '../Venue';
import Announcements from '../Announcements';
import Credits from '../Credits';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
  }
`;

const theme = {
  sizes: {
    button: '54px',
  },
  paddings: {
    menu: '0 15px',
    venueNav: '0 15px',
    venue: '54px 0',
    credits: '54px 0 0 0',
    schedule: '0 0 0 15px',
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
          {contextName === 'home' ? (
            <Home
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          ) : null}
          {contextName === 'venue' ? (
            <Venue
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          ) : null}
          {contextName === 'announcements' ? <Announcements /> : null}
          {contextName === 'credits' ? <Credits /> : null}
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
