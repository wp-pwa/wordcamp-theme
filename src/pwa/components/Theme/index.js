import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { injectGlobal } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import Slider from '../Slider';
import OnNow from '../OnNow';
import UpNext from '../UpNext';
import Schedule from '../Schedule';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
  }
`;

const theme = {
  color: 'steelblue',
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
        {contextName === 'home' ? (
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
        ) : null}
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
