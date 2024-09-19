import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {usePostEmailLogin, usePostSocialLogin} from '~/apis/auth/hook';
import CenterButton from '~/components/common/button/CenterButton';
import useNavigate from '~/hooks/navigator/useNavigation';
import {PostEmailLoginData} from '~/types/api/auth/data';
import {config} from '~/utils/config';
import {removeSecurityData, setSecurityData} from '~/utils/storage';

function Login() {
  const {navigate, reset} = useNavigate();
  const postEmailLogin = usePostEmailLogin();
  const postSocialLogin = usePostSocialLogin();

  const [form, setForm] = useState<PostEmailLoginData>({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    postEmailLogin
      .mutateAsync(form)
      .then(response => {
        if (response) {
          onLoginComplete(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onLoginWithKakao = async (): Promise<void> => {
    try {
      const kakaoLoginResponse: KakaoOAuthToken = await login();
      const {accessToken} = kakaoLoginResponse;

      const response = await postSocialLogin.mutateAsync({
        social: 'kakao',
        token: accessToken,
      });

      if (response) {
        onLoginComplete(response.data);
      }
    } catch (error) {
      console.log('@@@E ERROR');
      console.log(error);
    }
  };

  const onLoginComplete = async (tokenData: {
    access: string;
    refresh: string;
  }) => {
    try {
      await setSecurityData(config.ACCESS_TOKEN_NAME, tokenData.access);
      await setSecurityData(config.REFRESH_TOKEN_NAME, tokenData.refresh);

      reset({index: 0, routes: [{name: 'CommunityList'}]});
    } catch (error) {
      removeSecurityData(config.ACCESS_TOKEN_NAME);
      removeSecurityData(config.REFRESH_TOKEN_NAME);
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
          onPress={onLoginWithKakao}>
          <Text>카카오 로그인</Text>
        </CenterButton>
      </View>
    </View>
  );
}

export default Login;
