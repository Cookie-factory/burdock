import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {usePostEmailLogin, usePostSocialLogin} from '~/apis/auth/hook';
import ActiveButton from '~/components/common/button/ActiveButton';
import CenterButton from '~/components/common/button/CenterButton';
import FormInput from '~/components/common/input/FormInput';
import InnerLayout from '~/components/common/layout/InnerLayout';
import Text from '~/components/common/text/Text';
import Center from '~/components/common/view/Center';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';
import {PostEmailLoginData} from '~/types/api/auth/data';
import {config} from '~/utils/config';
import {APP_WIDTH} from '~/utils/dimension';
import {removeSecurityData, setSecurityData} from '~/utils/storage';

function Login() {
  const {reset, navigate} = useNavigate();
  const postEmailLogin = usePostEmailLogin();
  const postSocialLogin = usePostSocialLogin();

  const [form, setForm] = useState<PostEmailLoginData>({
    email: '',
    password: '',
  });

  const onMoveSignupPage = () => {
    navigate('Signup');
  };

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

      reset({index: 0, routes: [{name: 'tab'}]});
    } catch (error) {
      removeSecurityData(config.ACCESS_TOKEN_NAME);
      removeSecurityData(config.REFRESH_TOKEN_NAME);
    }
  };
  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <VStack
          mb={45}
          width={APP_WIDTH - 40}
          height={APP_WIDTH - 40}
          bgColor={colors.gray[40]}
        />

        <VStack mb={24}>
          <FormInput
            label="이메일"
            containerStyle={{
              marginBottom: 16,
            }}
            placeholder="이메일"
            onChangeText={text => setForm(prev => ({...prev, email: text}))}
            value={form.email}
          />

          <FormInput
            label="비밀번호"
            placeholder="비밀번호"
            onChangeText={text => setForm(prev => ({...prev, passwords: text}))}
            value={form.password}
          />
        </VStack>

        <ActiveButton onPress={onSubmit} buttonType="blue" text="로그인" />

        <Center mt={28} mb={20}>
          <HStack w={176} justifyContent="space-between">
            <CenterButton
              w={62}
              h={62}
              borderRadius={62}
              borderWidth={1}
              onPress={onLoginWithKakao}>
              <Text>카</Text>
            </CenterButton>

            <VStack h={36} w={1} bgColor={colors.gray[90]} />

            <CenterButton
              w={62}
              h={62}
              borderRadius={62}
              borderWidth={1}
              onPress={onLoginWithKakao}>
              <Text>애</Text>
            </CenterButton>
          </HStack>
        </Center>

        <Center>
          <HStack width={'auto'} justifyContent="space-between">
            <CenterButton width={'auto'} onPress={onLoginWithKakao}>
              <Text color={colors.gray[70]} fontSize={14}>
                이메일 찾기
              </Text>
            </CenterButton>

            <VStack h={10} mx={12} w={1} bgColor={colors.gray[70]} />

            <CenterButton width={'auto'} onPress={onLoginWithKakao}>
              <Text color={colors.gray[70]} fontSize={14}>
                비밀번호 찾기
              </Text>
            </CenterButton>

            <VStack h={10} mx={12} w={1} bgColor={colors.gray[70]} />

            <CenterButton width={'auto'} onPress={onMoveSignupPage}>
              <Text color={colors.gray[70]} fontSize={14}>
                회원가입
              </Text>
            </CenterButton>
          </HStack>
        </Center>
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default Login;
