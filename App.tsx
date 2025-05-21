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
import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

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
    async function pushApp() {
      // 포그라운드 메시지 수신 시 → 알림 표시
      messaging().onMessage(async remoteMessage => {
        console.log('🔔 포그라운드 수신:', remoteMessage);

        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_notification', // 파일명에서 확장자 제외
          },
        });
      });

      // 채널 생성 (Android 전용)
      await notifee.createChannel({
        id: 'default',
        name: '기본 채널',
        importance: AndroidImportance.HIGH,
      });
    }

    pushApp();
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

    // 백그라운드 설정 및 ui 변경 가능
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('🔋 백그라운드 수신:', remoteMessage);
      // 필요시 notifee로 수동 알림 표시도 가능
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
