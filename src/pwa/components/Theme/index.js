import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { injectGlobal } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import Slider from '../Slider';
import OnNow from '../Home/OnNow';
import UpNext from '../Home/UpNext';
import Schedule from '../Home/Schedule';
import HomeNav from '../Home/Nav';
import Menu from '../Menu';
import Venue from '../Venue/Venue';
import MilkyWay from '../Venue/MilkyWay';
import Andromeda from '../Venue/Andromeda';
import Hayabusa from '../Venue/Hayabusa';
import Cassini from '../Venue/Cassini';
import Rosetta from '../Venue/Rosetta';

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
            <Fragment>
              <Slider
                key="slider"
                index={selectedColumnIndex}
                onTransitionEnd={this.handleOnTransitionEnd}
              >
                {columns.map(({ selectedItem: { id, mstId } }) => {
                  if (id === 13) return <OnNow key={mstId} />;
                  if (id === 15) return <UpNext key={mstId} />;
                  return <Schedule key={mstId} />;
                })}
              </Slider>
              <HomeNav key="nav" />
              <Menu key="menu" />
            </Fragment>
          ) : null}
          {contextName === 'venue' ? (
            <Fragment>
              <Slider
                key="slider"
                index={selectedColumnIndex}
                onTransitionEnd={this.handleOnTransitionEnd}
              >
                {columns.map(({ selectedItem: { id, mstId } }) => {
                  if (id === 23) return <Venue key={mstId} />;
                  if (id === 26) return <MilkyWay key={mstId} />;
                  if (id === 28) return <Andromeda key={mstId} />;
                  if (id === 30) return <Hayabusa key={mstId} />;
                  if (id === 32) return <Cassini key={mstId} />;
                  return <Rosetta key={mstId} />;
                })}
              </Slider>
            </Fragment>
          ) : null}
          {contextName === 'announcements' ? <div>announcements</div> : null}
          {contextName === 'credits' ? <div>credits</div> : null}
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

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }) => ({
    contextName: connection.selectedContext.options.name,
    columns: connection.selectedContext.columns,
    selectedColumnIndex: connection.selectedColumn.index,
  })),
)(Theme);
