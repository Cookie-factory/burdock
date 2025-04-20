import React from 'react';
import {PaperProvider} from 'react-native-paper';
import BaseRouter from '~/router/BaseRouter';
import {config} from '~/utils/config';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SheetProvider} from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from '~/store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  console.log(config.TEST);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SheetProvider>
          <PaperProvider>
            <BaseRouter />
          </PaperProvider>
        </SheetProvider>

        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
