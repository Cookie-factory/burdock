import React, {useState} from 'react';
import {useGetVoteRanking} from '~/apis/vote/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import VoteModal from '~/components/vote/main/VoteModal';

function VoteMain() {
  const {data, refetch} = useGetVoteRanking({});

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCelebrityId, setSelectedCelebrityId] = useState<string>();

  // const [dataList, setDataList] = useState<CelebrityItem[]>([]);

  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCelebrityId(_id);
  };

  // useEffect(() => {
  //   if (data?.pages) {
  //     setDataList((data?.pages ?? []).flatMap(item => item.data));
  //   }
  // }, [data?.pages]);

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <VStack pb={30}>
          <Text>메인</Text>
        </VStack>

        <VStack>
          {(data?.data ?? []).map(item => (
            <CenterButton
              onPress={() => onVoteModalOpen(item.celebrityId)}
              key={item.celebrityId}
              py={20}
              mb={4}
              flexDirection="row"
              justifyContent="space-between">
              <Text>{item.celebrityName}</Text>
              <Text>{item.totalVotes}</Text>
            </CenterButton>
          ))}
        </VStack>
      </VStack>

      <VoteModal
        refetch={refetch}
        isOpen={isOpen}
        celebrityId={selectedCelebrityId}
        onClose={() => setIsOpen(false)}
      />
    </WhiteSafeAreaView>
  );
}

export default VoteMain;
