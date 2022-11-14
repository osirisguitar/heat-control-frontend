import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, Box, CssBaseline, ThemeProvider } from '@mui/material';

import './index.css';
import App from './App';

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
mdTheme.palette.mode = 'dark';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mdTheme}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          p: 2,
        }}
      >
        <CssBaseline />
        <App />
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
