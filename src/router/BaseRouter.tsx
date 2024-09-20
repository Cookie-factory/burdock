import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityList from '~/pages/community/list';
import CommunityContent from '~/pages/community/content';
import CommunityRegister from '~/pages/community/register';
import Login from '~/pages/login';
import {RouteList} from '~/types/navigator';

const stack = createNativeStackNavigator<RouteList>();

function BaseRouter() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="CommunityList" component={CommunityList} />
        <stack.Screen name="CommunityRegister" component={CommunityRegister} />
        <stack.Screen name="CommunityContent" component={CommunityContent} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseRouter;
