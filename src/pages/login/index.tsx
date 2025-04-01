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
import Image from '~/components/common/image/Image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useToastShow from '~/hooks/toast/useToastShow';

function Login() {
  const {reset, navigate} = useNavigate();
  const postEmailLogin = usePostEmailLogin();
  const postSocialLogin = usePostSocialLogin();
  const {onShowToast} = useToastShow();

  const [form, setForm] = useState<PostEmailLoginData>({
    email: '',
    password: '',
  });

  const onMoveSignupPage = () => {
    navigate('Signup');
  };

  const onMovePasswordFindPage = () => {
    navigate('PasswordFind');
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
        if (
          error.statusCode === 404 &&
          error.message === '계정 정보를 찾을 수 없습니다.'
        ) {
          // 회원 정보를 찾을 수 없는 경우
          onShowToast({
            text1: '잘못된 이메일 주소입니다.',
            text2: '이메일을 다시 확인해주세요.',
          });
        } else if (
          error.statusCode === 401 &&
          error.message === '비밀번호를 확인해주세요.'
        ) {
          // 비밀번호가 틀렸습니다.
          onShowToast({
            text1: '잘못된 비밀번호입니다.',
            text2: '비밀번호를 다시 확인해주세요.',
          });
        } else {
          onShowToast({
            text1: '로그인 오류입니다.',
          });
        }
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
      <KeyboardAwareScrollView
        style={{width: '100%'}}
        enableOnAndroid={true}
        extraScrollHeight={200} // 키보드와의 여유 공간
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <InnerLayout>
          <Image
            mb={45}
            width={APP_WIDTH - 40}
            height={APP_WIDTH - 40}
            source={require('../../assets/images/ImageMainLogo.webp')}
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
              secureTextEntry
              onChangeText={text =>
                setForm(prev => ({...prev, password: text}))
              }
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
                <Image
                  w={62}
                  h={62}
                  source={require('../../assets/images/ImageKakaoLogin.webp')}
                />
              </CenterButton>

              <VStack h={36} w={1} bgColor={colors.gray[90]} />

              <CenterButton
                w={62}
                h={62}
                borderRadius={62}
                borderWidth={1}
                onPress={onLoginWithKakao}>
                <Image
                  w={62}
                  h={62}
                  source={require('../../assets/images/ImageAppleLogin.webp')}
                />
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

              <VStack h={10} mx={16} w={1} bgColor={colors.gray[70]} />

              <CenterButton width={'auto'} onPress={onMovePasswordFindPage}>
                <Text color={colors.gray[70]} fontSize={14}>
                  비밀번호 찾기
                </Text>
              </CenterButton>

              <VStack h={10} mx={16} w={1} bgColor={colors.gray[70]} />

              <CenterButton width={'auto'} onPress={onMoveSignupPage}>
                <Text color={colors.gray[70]} fontSize={14}>
                  회원가입
                </Text>
              </CenterButton>
            </HStack>
          </Center>
        </InnerLayout>
      </KeyboardAwareScrollView>
    </WhiteSafeAreaView>
  );
}

export default Login;
