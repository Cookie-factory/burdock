import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {usePostEmailLogin} from '~/apis/auth/hook';
import CenterButton from '~/components/common/button/CenterButton';
import useNavigate from '~/hooks/navigator/useNavigation';
import {PostEmailLoginData} from '~/types/api/auth/data';

function Login() {
  const navigate = useNavigate();
  const postEmailLogin = usePostEmailLogin();

  const [form, setForm] = useState<PostEmailLoginData>({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    postEmailLogin
      .mutateAsync(form)
      .then(response => {
        console.log('@@@ response');
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();

      /*
      {
      "refreshToken":"",
      "accessToken":"",
      "idToken":"",
      "scopes":"",
      }
      */
      console.log('@ TOKEN');
      console.log(JSON.stringify(token));
    } catch (error) {
      console.log('@@@E ERROR');
      console.log(error);
    }
  };
  return (
    <View>
      <View>
        <TextInput
          mode="outlined"
          label="이메일"
          placeholder="이메일"
          right={<TextInput.Icon icon="eye" />}
          onChangeText={text => setForm(prev => ({...prev, email: text}))}
          value={form.email}
        />

        <TextInput
          mode="outlined"
          label="비밀번호"
          placeholder="비밀번호"
          right={<TextInput.Icon icon="eye" />}
          value={form.password}
          onChangeText={text => setForm(prev => ({...prev, password: text}))}
        />
      </View>

      <View style={{marginVertical: 30}}>
        <CenterButton
          style={{
            width: 200,
          }}
          onPress={onSubmit}>
          <Text>이메일로 로그인</Text>
        </CenterButton>
      </View>

      <View>
        <CenterButton
          style={{
            width: 200,
          }}
          onPress={signInWithKakao}>
          <Text>카카오 로그인</Text>
        </CenterButton>
      </View>
    </View>
  );
}

export default Login;
