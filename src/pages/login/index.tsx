import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useNavigate from '~/hooks/navigator/useNavigation';

function Login() {
  const navigate = useNavigate();
  return (
    <View>
      <Text>login</Text>

      <Button
        mode="contained"
        onPress={() => navigate.navigate('CommunityList')}>
        Go Community
      </Button>
    </View>
  );
}

export default Login;
