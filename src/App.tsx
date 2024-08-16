import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import UserList from './features/UserList';
import './App.css';

const queryClient = new QueryClient();
const theme = createTheme();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserList />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
