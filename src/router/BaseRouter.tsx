import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityList from '~/pages/community/list';
import CommunityContent from '~/pages/community/content';
import CommunityRegister from '~/pages/community/register';
import Login from '~/pages/login';
import {RouteList} from '~/types/navigator';
import Header from '~/components/common/header/Header';
import BackButton from '~/components/common/button/BackButton';
import TabRouter from './TabRouter';

const stack = createNativeStackNavigator<RouteList>();

function BaseRouter() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="tab"
          component={TabRouter}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            header: () => <Header title="로그인" />,
          }}
        />
        <stack.Screen
          name="CommunityList"
          component={CommunityList}
          options={{
            headerShown: true,
            header: () => (
              <Header title="커뮤니티" leftButton={<BackButton />} />
            ),
          }}
        />
        <stack.Screen
          name="CommunityRegister"
          component={CommunityRegister}
          options={{
            headerShown: true,
            header: () => (
              <Header title="게시글 등록" leftButton={<BackButton />} />
            ),
          }}
        />
        <stack.Screen
          name="CommunityContent"
          component={CommunityContent}
          options={{
            headerShown: true,
            header: () => (
              <Header title="게시글 내용" leftButton={<BackButton />} />
            ),
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseRouter;
