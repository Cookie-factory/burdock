import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {usePostEmailLogin, usePostSocialLogin} from '~/apis/auth/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Input from '~/components/common/input/Input';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useNavigate from '~/hooks/navigator/useNavigation';
import {PostEmailLoginData} from '~/types/api/auth/data';
import {config} from '~/utils/config';
import {removeSecurityData, setSecurityData} from '~/utils/storage';

function Login() {
  const {reset} = useNavigate();
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

  const onLoginWithKakao = async () => {
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
    <WhiteSafeAreaView>
      <VStack flex={1} px={20} borderWidth={10} borderColor={'blue'}>
        <VStack px={20} borderWidth={1}>
          <Input
            label="이메일"
            marginBottom={16}
            placeholder="이메일"
            onChangeText={text => setForm(prev => ({...prev, email: text}))}
            value={form.email}
          />

          <Input
            label="비밀번호"
            placeholder="비밀번호"
            onChangeText={text => setForm(prev => ({...prev, passwords: text}))}
            value={form.password}
          />
        </VStack>

        <VStack mt={30}>
          <CenterButton h={44} onPress={onSubmit}>
            <Text>이메일로 로그인</Text>
          </CenterButton>
        </VStack>

        <VStack my={14}>
          <CenterButton h={44} borderWidth={1} onPress={onLoginWithKakao}>
            <Text>카카오 로그인</Text>
          </CenterButton>
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default Login;
