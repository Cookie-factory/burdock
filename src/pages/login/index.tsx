import React from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import CenterButton from '~/components/common/button/CenterButton';
import useNavigate from '~/hooks/navigator/useNavigation';

function Login() {
  const navigate = useNavigate();
  return (
    <View>
      <View>
        <TextInput
          mode="outlined"
          label="이메일"
          placeholder="이메일"
          right={<TextInput.Icon icon="eye" />}
        />

        <TextInput
          mode="outlined"
          label="비밀번호"
          placeholder="비밀번호"
          right={<TextInput.Icon icon="eye" />}
        />
      </View>

      <View>
        <CenterButton
          style={{
            width: 200,
          }}
          onPress={() => navigate.navigate('CommunityList')}>
          <Text>이메일로 로그인</Text>
        </CenterButton>
      </View>
    </View>
  );
}

export default Login;
