import React from 'react';
import {config} from './src/types/utils/config';
import {PaperProvider} from 'react-native-paper';
import BaseRouter from '~/router/BaseRouter';

function App(): React.JSX.Element {
  console.log(config.TEST);

  return (
    <PaperProvider>
      <BaseRouter />
    </PaperProvider>
  );
}

export default App;
