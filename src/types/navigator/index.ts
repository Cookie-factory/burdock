import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  CommunityList: undefined;
};

export type RouteList = RootStackParamList;

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
