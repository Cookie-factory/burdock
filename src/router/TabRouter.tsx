import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, uiStyle} from '~/constants/style';
import CommunityList from '~/pages/community/list';
import VoteMain from '~/pages/vote/main';
import MypageMain from '~/pages/mypage/main';

import IconActiveHomeTab26 from '~/assets/icons/IconActiveHomeTab26.svg';
import IconInactiveHomeTab26 from '~/assets/icons/IconInactiveHomeTab26.svg';

import IconActiveVoteTab24 from '~/assets/icons/IconActiveVoteTab24.svg';
import IconInactiveVoteTab24 from '~/assets/icons/IconInactiveVoteTab24.svg';

import IconActiveCommunityTab22 from '~/assets/icons/IconActiveCommunityTab22.svg';
import IconInactiveCommunityTab22 from '~/assets/icons/IconInactiveCommunityTab22.svg';

import IconActivePersonalTab24 from '~/assets/icons/IconActivePersonalTab24.svg';
import IconInactivePersonalTab24 from '~/assets/icons/IconInactivePersonalTab24.svg';
import MainPage from '~/pages/main';

const tab = createBottomTabNavigator();

function TabRouter() {
  return (
    <tab.Navigator
      initialRouteName="VoteMain"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.3,
          shadowRadius: 16.0,
          elevation: 24,
          zIndex: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 100,
        },
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: colors.positive[10],
        tabBarInactiveTintColor: colors.gray[40],
        tabBarLabelStyle: {
          top: Platform.OS === 'android' ? 16 : 0,
          fontWeight: '500',
          fontSize: 10,
          marginBottom: Platform.OS === 'android' ? 40 : 12,
          lineHeight: 14,
        },
        // tabBarIconStyle: {
        //   top: Platform.OS === 'android' ? 16 : 0,
        //   width: 26,
        //   maxHeight: 26,
        //   marginBottom: 4,
        // },
      }}>
      <tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarLabel: '메인',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? <IconActiveHomeTab26 /> : <IconInactiveHomeTab26 />,
        }}
      />

      <tab.Screen
        name="VoteMain"
        component={VoteMain}
        options={{
          tabBarLabel: '투표',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? <IconActiveVoteTab24 /> : <IconInactiveVoteTab24 />,
        }}
      />

      <tab.Screen
        name="CommunityList"
        component={CommunityList}
        options={{
          tabBarLabel: '커뮤니티',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IconActiveCommunityTab22 />
            ) : (
              <IconInactiveCommunityTab22 />
            ),
        }}
      />
      <tab.Screen
        name="MypageMain"
        component={MypageMain}
        options={{
          tabBarLabel: '내 계정',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IconActivePersonalTab24 />
            ) : (
              <IconInactivePersonalTab24 />
            ),
        }}
      />
    </tab.Navigator>
  );
}

export default TabRouter;
