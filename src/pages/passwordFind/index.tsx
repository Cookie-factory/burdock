import _ from 'lodash';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActiveButton from '~/components/common/button/ActiveButton';
import FormInput from '~/components/common/input/FormInput';
import FormLabel from '~/components/common/input/FormLabel';
import InnerLayout from '~/components/common/layout/InnerLayout';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';

/**
 *@description 비밀번호 찾기 페이지
 */
function PasswordFind() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const onSubmit = () => {};
  return (
    <WhiteSafeAreaView>
      <KeyboardAwareScrollView style={{width: '100%'}} bounces={false}>
        <InnerLayout pt={44} pb={40}>
          <FormLabel>이메일</FormLabel>

          <FormInput
            label="이메일"
            containerStyle={{
              marginBottom: 16,
            }}
            placeholder="이메일"
            onChangeText={setEmail}
            value={email}
          />

          <FormLabel>인증 코드</FormLabel>
          <FormInput
            label="code"
            containerStyle={{
              marginBottom: 16,
            }}
            placeholder="인증 코드"
            onChangeText={setEmail}
            value={email}
          />

          <ActiveButton
            mt={32}
            buttonType={true ? 'red' : 'gray'}
            text="확인"
            onPress={onSubmit}
          />
        </InnerLayout>
      </KeyboardAwareScrollView>
    </WhiteSafeAreaView>
  );
}

export default PasswordFind;
