import React from 'react';
import {PaperProvider} from 'react-native-paper';
import BaseRouter from '~/router/BaseRouter';
import {config} from '~/utils/config';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  console.log(config.TEST);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <BaseRouter />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
