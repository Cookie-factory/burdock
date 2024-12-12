import _ from 'lodash';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePostSignup} from '~/apis/auth/hook';
import ActiveButton from '~/components/common/button/ActiveButton';
import FormErrorMessage from '~/components/common/input/FormErrorMessage';
import FormInput from '~/components/common/input/FormInput';
import FormLabel from '~/components/common/input/FormLabel';
import InnerLayout from '~/components/common/layout/InnerLayout';
import CustomSelector from '~/components/common/selector/Selector';
import CustomSelectorActionSheet from '~/components/common/selector/SelectorModal';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useActionsheet from '~/hooks/actionsheet/useActionsheet';
import useNavigate from '~/hooks/navigator/useNavigation';
import {GenderType} from '~/types/api/auth';
import {PostSignupData} from '~/types/api/auth/data';
import {SelectorItem} from '~/types/components/common/selector';

function Signup() {
  const postSignup = usePostSignup();
  const navigate = useNavigate();

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
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const ageSelectorOpen = useActionsheet();
  const genderSelectorOpen = useActionsheet();

  const onSubmit = () => {
    console.log(isActiveSubmitButton);
    if (!isActiveSubmitButton) return;
    if (passwordConfirm !== form.password) return;

    postSignup
      .mutateAsync({
        ...form,
        gender: genderSelectedItem?.value as GenderType,
        age: Number(ageSelectedItem?.value),
      })
      .then(response => {
        if (response.statusCode === 201) {
          navigate.reset({index: 0, routes: [{name: 'tab'}]});
        }
      });
  };

  const isActiveSubmitButton =
    !_.isEmpty(form?.email) &&
    !_.isEmpty(form?.nickname) &&
    !_.isEmpty(form?.password) &&
    Boolean(genderSelectedItem) &&
    Boolean(ageSelectedItem);

  return (
    <WhiteSafeAreaView>
      <KeyboardAwareScrollView style={{width: '100%'}} bounces={false}>
        <InnerLayout pt={44} pb={40}>
          <FormLabel>이메일</FormLabel>
          <FormInput
            placeholder="이메일"
            onChangeText={text => setForm(prev => ({...prev, email: text}))}
          />
          <FormErrorMessage isShow={false}>
            잘못된 이메일 주소입니다.
          </FormErrorMessage>

          <FormLabel>비밀번호</FormLabel>
          <FormInput
            secureTextEntry
            textContentType="password"
            placeholder="비밀번호"
            onChangeText={text => setForm(prev => ({...prev, password: text}))}
          />
          <FormErrorMessage isShow={false}>
            잘못된 비밀번호입니다.
          </FormErrorMessage>

          <FormLabel>비밀번호 확인</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="비밀번호 확인"
            textContentType="password"
            onChangeText={text => setPasswordConfirm(text)}
          />
          <FormErrorMessage isShow={false}>
            비밀번호가 일치하지 않습니다.
          </FormErrorMessage>

          <FormLabel>닉네임</FormLabel>
          <FormInput
            placeholder="닉네임"
            onChangeText={text => setForm(prev => ({...prev, nickname: text}))}
          />
          <FormErrorMessage isShow={false}>
            잘못된 닉네임입니다.
          </FormErrorMessage>

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

          <ActiveButton
            mt={32}
            buttonType={isActiveSubmitButton ? 'red' : 'gray'}
            text="확인"
            onPress={onSubmit}
          />
        </InnerLayout>
      </KeyboardAwareScrollView>

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
