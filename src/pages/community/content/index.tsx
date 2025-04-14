import React, {useState} from 'react';
import {useDeleteBoard, useGetBoard} from '~/apis/board/hook';
import ActiveButton from '~/components/common/button/ActiveButton';
import CenterButton from '~/components/common/button/CenterButton';
import Image from '~/components/common/image/Image';
import FormInput from '~/components/common/input/FormInput';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import Text from '~/components/common/text/Text';
import Center from '~/components/common/view/Center';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import CommentList from '~/components/community/content/comment/CommentList';
import CommentTopView from '~/components/community/content/comment/CommentTopView';
import ContentHelperView from '~/components/community/content/ContentHelperView';
import ContentText from '~/components/community/content/ContentText';
import ContentTitle from '~/components/community/content/ContentTitle';
import ContentTopView from '~/components/community/content/ContentTopView';
import {colors} from '~/constants/style';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';
import {config} from '~/utils/config';

/**
 *@description 게시글 내용 페이지
 */
function CommunityContent() {
  const {navigate, goBack} = useNavigate();

  const param = useParam('CommunityContent');

  const {data, refetch} = useGetBoard({id: param?.id});
  const deleteBoard = useDeleteBoard();

  const [comment, setComment] = useState('');

  const onDelete = () => {
    if (!data?.data.id) return;

    deleteBoard.mutateAsync({id: data?.data.id}).then(response => {
      if (response.statusCode === 200) {
        console.log('@ 삭제완료');
        goBack();
      }
    });
  };

  const onMoveModifyPage = () => {
    if (!data?.data.id) return;

    navigate('CommunityRegister', {
      id: data?.data.id,
    });
  };

  useFocusScreen(() => {
    refetch();
  });

  return (
    <WhiteSafeAreaView>
      <ScrollView>
        <VStack flex={1} pt={20}>
          <ContentTopView />

          <HStack borderWidth={1} h={320} bgColor={colors.gray[60]}>
            {(data?.data.images ?? []).map((item, i) => {
              return (
                <Center borderWidth={1} w={80} h={80} key={i}>
                  <Image
                    borderWidth={1}
                    w={80}
                    h={80}
                    key={i}
                    source={{
                      uri: `${config.IMAGE_BASE_URL}${item}`,
                    }}
                  />
                </Center>
              );
            })}
          </HStack>

          <InnerLayout>
            <ContentHelperView />

            <ContentTitle title={data?.data.title ?? ''} />

            <ContentText content={data?.data.content ?? ''} />

            <VStack>
              <CommentTopView />

              <FormInput
                p={16}
                h={132}
                multiline
                label="댓글"
                placeholder="댓글 작성하기"
                onChangeText={text => setComment(text)}
                value={comment}
              />

              <ActiveButton
                my={20}
                onPress={() => {}}
                buttonType="blue"
                text="등록하기"
              />
            </VStack>

            <CommentList />
          </InnerLayout>
        </VStack>
      </ScrollView>
    </WhiteSafeAreaView>
  );
}

export default CommunityContent;
