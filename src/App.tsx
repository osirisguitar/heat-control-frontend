import { PageDashboard } from './pages/pageDashboard';
import { createTheme, Box, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
mdTheme.palette.mode = 'dark';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <PageDashboard />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
    
  )
}

export default App;
