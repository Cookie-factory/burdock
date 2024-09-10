import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useNavigate from '~/hooks/navigator/useNavigation';

function CommunityList() {
  const navigate = useNavigate();
  return (
    <View>
      <Text>community list</Text>

      <Button mode="contained" onPress={() => navigate.navigate('Login')}>
        Go Login
      </Button>
    </View>
  );
}

export default CommunityList;
