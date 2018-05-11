import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import Main from './Main';

const theme = {
  color: 'steelblue',
};

const Theme = () => (
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>
);

export default Theme;
