import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * @description script 설명
 * stack 라이브러리 제네릭이 type 형식이라 interface 대신 type으로 작성
 */

/**
 * @description Tab.Navigator에 등록된 tab list
 * @Use Tab.Navigator에 탭 추가시 하단에 추가
 * @example param 추가시,
 * { ... Home: { id: string; }; ... }
 */
export type RootTabParamList = {
  CommunityList: undefined;
  VoteMain: undefined;
  MypageMain: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  tab: undefined;
  // CommunityList: undefined;
  CommunityRegister?: {
    id: string;
  };
  CommunityContent: {
    id: string;
  };
  Inquiry: undefined;
  // VoteMain: undefined;
  // MypageMain: undefined;
  Setting: undefined;
  NoticeList: undefined;
  NoticeContent: {id: string};
  EventList: undefined;
  EventContent: {id: string};
  SearchPage: undefined;
  Signup: undefined;
  PasswordFind: undefined;
};

// export type RouteList = RootStackParamList;
export type RouteList = RootTabParamList & RootStackParamList;

/**
 * @description useNavigation 제네릭 타입
 * @example
 * const navigation = useNavigation<NavigationProp<RouteList>>();
 */
export type NavigationHookProp = NavigationProp<RouteList>;

export type RouteHookProp<T extends keyof RootStackParamList> = RouteProp<
  RouteList,
  T
>;

export type StackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<ParamListBase, T>;
