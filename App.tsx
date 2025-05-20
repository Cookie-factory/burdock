import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import BaseRouter from '~/router/BaseRouter';
import {config} from '~/utils/config';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SheetProvider} from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from '~/store';
import BootSplash from 'react-native-bootsplash';
const queryClient = new QueryClient();
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

function App(): React.JSX.Element {
  console.log(config.TEST);

  async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    BootSplash.hide({fade: true});

    requestPermission();

    messaging()
      .getToken()
      .then(res => {
        console.log('FCM Token:', res);
      });

    // 앱 종료 후 메시지 클릭
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state:', remoteMessage);
        }
      });

    // 앱 백그라운드에서 메시지 클릭
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened from background state:', remoteMessage);
    });
  }, []);

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
