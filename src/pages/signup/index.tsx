import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActiveButton from '~/components/common/button/ActiveButton';
import FormErrorMessage from '~/components/common/input/FormErrorMessage';
import FormInput from '~/components/common/input/FormInput';
import FormLabel from '~/components/common/input/FormLabel';
import InnerLayout from '~/components/common/layout/InnerLayout';
import CustomSelector from '~/components/common/selector/Selector';
import CustomSelectorActionSheet from '~/components/common/selector/SelectorModal';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useActionsheet from '~/hooks/actionsheet/useActionsheet';
import {SelectorItem} from '~/types/components/common/selector';

function Signup() {
  const list: SelectorItem[] = [
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

  const [selectedItem, setSelectedItem] = useState<SelectorItem>();

  const {onOpen, onClose, isOpen} = useActionsheet();

  return (
    <WhiteSafeAreaView>
      <KeyboardAwareScrollView style={{width: '100%'}} bounces={false}>
        <InnerLayout pt={44} pb={40}>
          <FormLabel>이메일</FormLabel>
          <FormInput placeholder="이메일" />
          <FormErrorMessage isShow={false}>
            잘못된 이메일 주소입니다.
          </FormErrorMessage>

          <FormLabel>비밀번호</FormLabel>
          <FormInput />
          <FormErrorMessage isShow={false}>
            잘못된 비밀번호입니다.
          </FormErrorMessage>

          <FormLabel>비밀번호 확인</FormLabel>
          <FormInput />
          <FormErrorMessage isShow={false}>
            비밀번호가 일치하지 않습니다.
          </FormErrorMessage>

          <FormLabel>닉네임</FormLabel>
          <FormInput />
          <FormErrorMessage isShow={false}>
            잘못된 닉네임입니다.
          </FormErrorMessage>

          <FormLabel>연령대</FormLabel>
          <CustomSelector
            placeholder="연령대를 선택해주세요."
            onPress={onOpen}
            text={selectedItem?.text ?? ''}
          />

          <FormLabel mt={32}>성별</FormLabel>
          <FormInput mb={38} />

          <ActiveButton buttonType="gray" text="확인" />
        </InnerLayout>
      </KeyboardAwareScrollView>

      <CustomSelectorActionSheet
        isOpen={isOpen}
        onClose={onClose}
        list={list}
        onSelect={setSelectedItem}
        selectedItem={selectedItem}
        height={400}
        title="연령대"
      />
    </WhiteSafeAreaView>
  );
}

export default Signup;
