import React, {useState} from 'react';
import {useGetVoteRanking} from '~/apis/vote/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import SearchBar from '~/components/common/searchBar/SearchBar';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import VoteItem from '~/components/vote/main/VoteItem';
import VoteModal from '~/components/vote/main/VoteModal';
import {colors} from '~/constants/style';
import useParam from '~/hooks/navigator/useParam';
import {APP_HEIGHT} from '~/utils/dimension';
import {getRemainTimeFromNow} from '~/utils/time';

/**
 *@description 특정 투표 랭킹 리스트
 */
function VoteRankingList() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>();
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const param = useParam('VoteRankingList');

  const {data, refetch} = useGetVoteRanking({
    voteSubjectId: param?.voteSubjectId ?? '',
    take: 10,
    search: searchText,
  });

  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCandidateId(_id);
  };

  return (
    <WhiteSafeAreaView backgroundColor={colors.gray[10]}>
      <InnerLayout>
        <VStack
          alignItems="flex-start"
          bgColor={colors.gray[0]}
          borderRadius={12}
          borderWidth={1}
          borderColor={colors.gray[30]}
          minHeight={APP_HEIGHT - 280}>
          <VStack
            mb={24}
            alignItems="flex-start"
            borderTopLeftRadius={12}
            borderTopRightRadius={12}
            backgroundColor={'#1A1533'}
            px={20}
            pt={18}
            pb={40}>
            <CustomText mb={16} fontSize={11} color={colors.gray[0]}>
              {getRemainTimeFromNow(data?.subjectInfo.endAt)}
            </CustomText>

            <CustomText mb={6} fontSize={16} color={colors.gray[0]}>
              {data?.subjectInfo.title ?? ''}
            </CustomText>

            <CustomText mb={22} color={colors.gray[10]}>
              {data?.subjectInfo.description ?? ''}
            </CustomText>

            <SearchBar
              placeholder="캐릭터 검색"
              searchText={searchText}
              onChangeText={setSearchText}
            />
          </VStack>

          <VStack px={20}>
            <ScrollView>
              {data?.pages.map(item => (
                <React.Fragment key={item.id}>
                  <VoteItem onVoteModalOpen={onVoteModalOpen} data={item} />
                </React.Fragment>
              ))}
            </ScrollView>
          </VStack>
        </VStack>
      </InnerLayout>

      <VoteModal
        voteSubjectId={param?.voteSubjectId}
        type="THEME_VOTE"
        refetch={refetch}
        candidateId={selectedCandidateId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </WhiteSafeAreaView>
  );
}

export default VoteRankingList;
