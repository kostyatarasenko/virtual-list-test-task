import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserList from './features/UsersList';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

export default App;
