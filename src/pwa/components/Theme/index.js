import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
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

const Theme = ({ columns, selectedColumnIndex }) => (
  <ThemeProvider theme={theme}>
    <Slider key="slider" index={selectedColumnIndex}>
      {columns.map(({ selectedItem: { type, id, mstId } }) => {
        if (type === 'page') {
          if (id === 13) return <OnNow key={mstId} />;
          if (id === 15) return <UpNext key={mstId} />;
          if (id === 17) return <Schedule key={mstId} />;
        }

        return null;
      })}
    </Slider>
  </ThemeProvider>
);

Theme.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
};

export default inject(({ connection }) => ({
  columns: connection.selectedContext.columns,
  selectedColumnIndex: connection.selectedColumn.index,
}))(Theme);
