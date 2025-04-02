import _, {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  usePostCheckDuplicateEmail,
  usePostCheckDuplicateNickname,
  usePostSignup,
} from '~/apis/auth/hook';
import ActiveButton from '~/components/common/button/ActiveButton';
import FormStatusMessage from '~/components/common/input/FormStatusMessage';
import FormInput from '~/components/common/input/FormInput';
import FormLabel from '~/components/common/input/FormLabel';
import InnerLayout from '~/components/common/layout/InnerLayout';
import CustomSelector from '~/components/common/selector/Selector';
import CustomSelectorActionSheet from '~/components/common/selector/SelectorModal';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {regrex} from '~/constants/regEx';
import {errorLabelText, toastText} from '~/constants/text';
import useActionsheet from '~/hooks/actionsheet/useActionsheet';
import useNavigate from '~/hooks/navigator/useNavigation';
import useToastShow from '~/hooks/toast/useToastShow';
import {GenderType} from '~/types/api/auth';
import {PostSignupData} from '~/types/api/auth/data';
import {FormStatus, SelectorItem} from '~/types/components/common/selector';
import {isApiErrorWithMessage} from '~/utils/api';
import useParam from '~/hooks/navigator/useParam';
import HStack from '~/components/common/view/HStack';
import IconUncheck18 from '~/assets/icons/IconUncheck18.svg';
import IconCheck18 from '~/assets/icons/IconCheck18.svg';
import CustomText from '~/components/common/text/Text';
import {colors} from '~/constants/style';
import PrivacyModal from '~/components/signup/PrivacyModal';
import CenterButton from '~/components/common/button/CenterButton';

function Signup() {
  const postSignup = usePostSignup();
  const navigate = useNavigate();
  const toastShow = useToastShow();
  const route = useParam('Signup');
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);

  const initStatusForm = {
    email: {
      isShow: false,
      text: '',
      type: 'ERROR' as FormStatus,
    },
    password: {
      isShow: false,
      text: '',
      type: 'ERROR' as FormStatus,
    },
    confirmPassword: {
      isShow: false,
      text: '',
      type: 'ERROR' as FormStatus,
    },
    nickname: {
      isShow: false,
      text: '',
      type: 'ERROR' as FormStatus,
    },
  };

  const [statusForm, setStatusForm] = useState(initStatusForm);

  const genderSelectorList: SelectorItem[] = [
    {
      value: 'FEMALE',
      text: '여성',
    },
    {
      value: 'MALE',
      text: '남성',
    },
  ];

  const ageSelectorList: SelectorItem[] = [
    {
      value: '10',
      text: '10대',
    },
    {
      value: '20',
      text: '20대',
    },
    {
      value: '30',
      text: '30대',
    },
    {
      value: '40',
      text: '40대',
    },
    {
      value: '50',
      text: '50대',
    },
    {
      value: '60',
      text: '60대 이상',
    },
  ];

  const [ageSelectedItem, setAgeSelectedItem] = useState<SelectorItem>();
  const [genderSelectedItem, setGenderSelectedItem] = useState<SelectorItem>();
  const [form, setForm] = useState<Omit<PostSignupData, 'age' | 'gender'>>({
    email: '',
    password: '',
    nickname: '',
    privacyAgree: false,
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const ageSelectorOpen = useActionsheet();
  const genderSelectorOpen = useActionsheet();

  const {mutateAsync: checkDuplicateNicknameMutate} =
    usePostCheckDuplicateNickname();

  const {mutateAsync: checkDuplicateEmailMutate} = usePostCheckDuplicateEmail();

  /**
   *@description 회원가입 이벤트
   */
  const onSubmit = () => {
    if (!isActiveSubmitButton) return;

    if (passwordConfirm !== form.password) {
      toastShow.onShowToast({
        text1: toastText.error.noMatchPassword,
        type: 'error',
      });

      return;
    }

    if (!regrex.email.test(form.email)) {
      toastShow.onShowToast({
        text1: toastText.error.invalidEmailFormat,
        type: 'error',
      });

      return;
    }

    if (!genderSelectedItem?.value) {
      toastShow.onShowToast({
        text1: toastText.error.noChoiceGender,
        type: 'error',
      });

      return;
    }

    if (!ageSelectedItem?.value) {
      toastShow.onShowToast({
        text1: toastText.error.noChoiceAge,
        type: 'error',
      });

      return;
    }

    postSignup
      .mutateAsync({
        ...form,
        gender: genderSelectedItem?.value as GenderType,
        age: Number(ageSelectedItem?.value),
      })
      .then(response => {
        if (response.statusCode === 201) {
          toastShow.onShowToast({
            text1: `${form.nickname}님 ${toastText.success.signupComplete}`,
          });
          navigate.reset({index: 0, routes: [{name: 'tab'}]});
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangePassword = (_password: string, isConfirm?: boolean) => {
    if (isConfirm) {
      // 비밀번호 확인 입력일 경우
      setPasswordConfirm(_password);
    } else {
      setForm(prev => ({...prev, password: _password}));
    }
  };

  const isActiveSubmitButton =
    !_.isEmpty(form?.email) &&
    !_.isEmpty(form?.nickname) &&
    !_.isEmpty(form?.password) &&
    Boolean(genderSelectedItem) &&
    Boolean(ageSelectedItem) &&
    form.privacyAgree;

  const onChangeEmail = useCallback(
    debounce(email => {
      if (!regrex.email.test(email)) {
        setStatusForm(prev => ({
          ...prev,
          email: initStatusForm.email,
        }));
      } else {
        checkDuplicateEmailMutate(email)
          .then(response => {
            if (response.data) {
              setStatusForm(prev => ({
                ...prev,
                email: {
                  isShow: true,
                  text: response.data,
                  type: 'SUCCESS',
                },
              }));
            }
          })
          .catch(error => {
            let errorMessage = '';

            if (isApiErrorWithMessage(error)) {
              //
              errorMessage = error?.message;
            } else {
              // 문법 오류거나 다른 서버에서 받아오는 특정 양식 api 오류일 경우
              errorMessage = errorLabelText.error;
            }

            setStatusForm(prev => ({
              ...prev,
              email: {
                isShow: true,
                text: errorMessage,
                type: 'ERROR',
              },
            }));
          });
      }
    }, 500),
    [],
  );

  const onChangeNickname = useCallback(
    debounce(nickname => {
      if (nickname.length < 2) {
        setStatusForm(prev => ({
          ...prev,
          nickname: initStatusForm.nickname,
        }));
      } else {
        checkDuplicateNicknameMutate(nickname)
          .then(response => {
            if (response.data) {
              setStatusForm(prev => ({
                ...prev,
                nickname: {
                  isShow: true,
                  text: response.data,
                  type: 'SUCCESS',
                },
              }));
            }
          })
          .catch(error => {
            let errorMessage = '';

            if (isApiErrorWithMessage(error)) {
              //
              errorMessage = error?.message;
            } else {
              // 문법 오류거나 다른 서버에서 받아오는 특정 양식 api 오류일 경우
              errorMessage = errorLabelText.error;
            }
            //

            setStatusForm(prev => ({
              ...prev,
              nickname: {
                isShow: true,
                text: errorMessage,
                type: 'ERROR',
              },
            }));
          });
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (route?.email && route?.email !== '') {
      setForm(prev => ({...prev, email: route?.email ?? ''}));
    }
  }, []);

  return (
    <WhiteSafeAreaView>
      <KeyboardAwareScrollView style={{width: '100%'}} bounces={false}>
        <InnerLayout pt={44} pb={40}>
          <FormLabel>이메일</FormLabel>
          <FormInput
            placeholder="이메일"
            onChangeText={text => {
              onChangeEmail(text);

              setForm(prev => ({...prev, email: text}));
            }}
            value={form.email}
          />
          <FormStatusMessage
            isShow={statusForm.email.isShow}
            type={statusForm.email.type}>
            {statusForm.email.text}
          </FormStatusMessage>

          <FormLabel>비밀번호 (*8~20자)</FormLabel>
          <FormInput
            secureTextEntry
            textContentType="password"
            placeholder="비밀번호"
            onChangeText={onChangePassword}
            value={form.password}
          />
          <FormStatusMessage
            isShow={statusForm.password.isShow}
            type={statusForm.password.type}>
            {statusForm.password.text}
          </FormStatusMessage>

          <FormLabel>비밀번호 확인</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="비밀번호 확인"
            textContentType="password"
            onChangeText={text => onChangePassword(text, true)}
            value={passwordConfirm}
          />
          <FormStatusMessage
            isShow={statusForm.confirmPassword.isShow}
            type={statusForm.confirmPassword.type}>
            {statusForm.confirmPassword.text}
          </FormStatusMessage>

          <FormLabel>닉네임 (*2~16자)</FormLabel>
          <FormInput
            placeholder="닉네임"
            onChangeText={text => {
              onChangeNickname(text);

              setForm(prev => ({...prev, nickname: text}));
            }}
            value={form.nickname}
          />
          <FormStatusMessage
            isShow={statusForm.nickname.isShow}
            type={statusForm.nickname.type}>
            {statusForm.nickname.text}
          </FormStatusMessage>

          <FormLabel>연령대</FormLabel>
          <CustomSelector
            placeholder="연령대를 선택해주세요."
            onPress={ageSelectorOpen.onOpen}
            text={ageSelectedItem?.text ?? ''}
          />

          <FormLabel mt={32}>성별</FormLabel>
          <CustomSelector
            placeholder="성별을 선택해주세요."
            onPress={genderSelectorOpen.onOpen}
            text={genderSelectedItem?.text ?? ''}
          />

          <CenterButton
            onPress={() => {
              setForm(prev => ({...prev, privacyAgree: !prev.privacyAgree}));
              setPrivacyModalOpen(true);
            }}>
            <HStack mt={22} px={4} py={6}>
              {form.privacyAgree ? (
                <IconCheck18 />
              ) : (
                <IconUncheck18 fill={colors.gray[10]} />
              )}

              <CustomText
                pl={10}
                fontWeight={'bold'}
                color={
                  form.privacyAgree ? colors.positive[-10] : colors.gray[50]
                }>
                개인정보 처리방침 동의
              </CustomText>
            </HStack>
          </CenterButton>

          <ActiveButton
            mt={32}
            buttonType={isActiveSubmitButton ? 'blue' : 'gray'}
            text="확인"
            onPress={onSubmit}
          />
        </InnerLayout>
      </KeyboardAwareScrollView>

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <CustomSelectorActionSheet
        isOpen={genderSelectorOpen.isOpen}
        onClose={genderSelectorOpen.onClose}
        list={genderSelectorList}
        onSelect={setGenderSelectedItem}
        selectedItem={genderSelectedItem}
        height={200}
        title="성별"
      />

      <CustomSelectorActionSheet
        isOpen={ageSelectorOpen.isOpen}
        onClose={ageSelectorOpen.onClose}
        list={ageSelectorList}
        onSelect={setAgeSelectedItem}
        selectedItem={ageSelectedItem}
        height={440}
        title="연령대"
      />
    </WhiteSafeAreaView>
  );
}

export default Signup;
