import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {uiStyle} from '~/constants/style';
import CommunityList from '~/pages/community/list';
import VoteMain from '~/pages/vote/main';
import MypageMain from '~/pages/mypage/main';

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
          height: uiStyle.tab.height,
        },
        tabBarAllowFontScaling: false,
        // tabBarActiveTintColor: colors.fussOrange[0],
        // tabBarInactiveTintColor: colors.grayScale[50],
        tabBarLabelStyle: {
          top: Platform.OS === 'android' ? 16 : 0,
          fontWeight: '500',
          fontSize: 10,
          marginBottom: Platform.OS === 'android' ? 40 : 12,
          lineHeight: 14,
        },
        tabBarIconStyle: {
          top: Platform.OS === 'android' ? 16 : 0,
          width: 26,
          maxHeight: 26,
          marginBottom: 4,
        },
      }}>
      <tab.Screen
        name="VoteMain"
        component={VoteMain}
        options={{
          tabBarLabel: '메인',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <tab.Screen
        name="CommunityList"
        component={CommunityList}
        options={{
          tabBarLabel: '커뮤니티',
          headerShown: false,
          unmountOnBlur: true,
          //   tabBarIcon: ({focused}) => (
          //     <ContentsTabIcon
          //       fill={focused ? colors.fussOrange[0] : colors.grayScale[40]}
          //       subFill={focused ? colors.fussYellow[0] : colors.grayScale[30]}
          //     />
          //   ),
        }}
      />
      <tab.Screen
        name="MypageMain"
        component={MypageMain}
        options={{
          tabBarLabel: '내 계정',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </tab.Navigator>
  );
}

export default TabRouter;
