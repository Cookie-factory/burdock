import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityList from '~/pages/community';
import Login from '~/pages/login';
import {RouteList} from '~/types/navigator';

const Stack = createNativeStackNavigator<RouteList>();

function BaseRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CommunityList" component={CommunityList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseRouter;
