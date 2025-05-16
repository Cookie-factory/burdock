import _, {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {
  useGetAuthInfo,
  usePatchUserInfo,
  usePostCheckDuplicateNickname,
} from '~/apis/auth/hook';
import ActiveButton from '~/components/common/button/ActiveButton';
import FormStatusMessage from '~/components/common/input/FormStatusMessage';
import FormInput from '~/components/common/input/FormInput';
import FormLabel from '~/components/common/input/FormLabel';
import InnerLayout from '~/components/common/layout/InnerLayout';
import CustomSelector from '~/components/common/selector/Selector';
import CustomSelectorActionSheet from '~/components/common/selector/SelectorModal';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {errorLabelText, toastText} from '~/constants/text';
import useActionsheet from '~/hooks/actionsheet/useActionsheet';
import useNavigate from '~/hooks/navigator/useNavigation';
import useToastShow from '~/hooks/toast/useToastShow';
import {PostSignupData} from '~/types/api/auth/data';
import {FormStatus, SelectorItem} from '~/types/components/common/selector';
import {isApiErrorWithMessage} from '~/utils/api';
import CharacterPageMoveButton from '~/components/common/button/CharacterButton';
import {useAppSelector} from '~/hooks/redux';
import {GenderType} from '~/types/api/auth';
import {useDispatch} from 'react-redux';
import {
  addSelectedCharacter,
  clearSelectedCharacter,
} from '~/store/slices/characterSlice';

function MyPageModification() {
  const navigate = useNavigate();
  const toastShow = useToastShow();
  const dispatch = useDispatch();

  const initStatusForm = {
    email: {
      isShow: false,
      text: '',
      type: 'DEFAULT' as FormStatus,
    },
    nickname: {
      isShow: false,
      text: '',
      type: 'DEFAULT' as FormStatus,
    },
  };

  const [statusForm, setStatusForm] = useState(initStatusForm);

  const selectedCharacters = useAppSelector(
    state => state.counter.selectedCharacters,
  );

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
  const [form, setForm] = useState<
    Omit<
      PostSignupData,
      'privacyAgree' | 'password' | 'email' | 'age' | 'gender'
    > & {
      introduce?: string;
    }
  >({
    nickname: '',
  });

  const isActiveSubmitButton =
    !_.isEmpty(form?.nickname) &&
    Boolean(genderSelectedItem) &&
    Boolean(ageSelectedItem);

  const ageSelectorOpen = useActionsheet();
  const genderSelectorOpen = useActionsheet();

  const {mutateAsync: checkDuplicateNicknameMutate} =
    usePostCheckDuplicateNickname();

  // 유저 정보 가져오기
  const {data: prevAuthData, isSuccess, refetch} = useGetAuthInfo();
  const {mutateAsync: patchUserInfoMutate} = usePatchUserInfo();

  /**
   *@description 수정하기 이벤트
   */
  const onSubmit = () => {
    patchUserInfoMutate({
      ...form,
      age: Number(ageSelectedItem?.value),
      gender: genderSelectedItem?.value as GenderType,
      firstCharacterId: selectedCharacters[0]?.id,
    }).then(response => {
      if (response.statusCode === 200) {
        refetch();
        dispatch(clearSelectedCharacter());
        toastShow.onShowToast({text1: '자기 정보가 수정완료했습니다.'});
        navigate.goBack();
      }
    });
  };

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
    if (isSuccess && prevAuthData?.data) {
      const {age, nickname, introduce, gender} = prevAuthData?.data ?? {
        age: undefined,
        nickname: undefined,
        introduce: undefined,
        gender: undefined,
      };

      if (prevAuthData?.data.firstCharacter) {
        dispatch(addSelectedCharacter(prevAuthData?.data.firstCharacter));
      }

      setAgeSelectedItem(
        age
          ? ageSelectorList.find(item => item.value === age.toString())
          : ageSelectorList[0],
      );
      setGenderSelectedItem(
        gender
          ? genderSelectorList.find(item => item.value === gender)
          : genderSelectorList[0],
      );
      setForm({
        nickname: nickname ?? '',
        introduce: introduce ?? '',
      });
    }
  }, [isSuccess]);

  return (
    <WhiteSafeAreaView>
      <InnerLayout>
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

        <FormLabel>최애 캐릭터</FormLabel>
        <CharacterPageMoveButton
          placeHolder={'최애 캐릭터'}
          text={selectedCharacters}
          isOne
        />

        <FormStatusMessage
          isShow={statusForm.nickname.isShow}
          type={statusForm.nickname.type}>
          {statusForm.nickname.text}
        </FormStatusMessage>

        <FormLabel>하고 싶은 말</FormLabel>
        <FormInput
          placeholder="하고 싶은 말"
          onChangeText={text => {
            setForm(prev => ({...prev, introduce: text}));
          }}
          value={form.introduce}
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

        <ActiveButton
          mt={32}
          buttonType={isActiveSubmitButton ? 'blue' : 'gray'}
          text="수정"
          onPress={onSubmit}
        />
      </InnerLayout>

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

export default MyPageModification;
