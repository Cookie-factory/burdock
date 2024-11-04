import React, {useEffect, useState} from 'react';
import {useGetCelebrityList} from '~/apis/celebrity/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {CelebrityItem} from '~/types/api/celebrity';

function VoteMain() {
  const {data} = useGetCelebrityList({
    category: 'YOUTUBE',
  });

  const [dataList, setDataList] = useState<CelebrityItem[]>([]);

  useEffect(() => {
    if (data?.pages) {
      setDataList((data?.pages ?? []).flatMap(item => item.data));
    }
  }, [data?.pages]);
  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <VStack pb={30}>
          <Text>메인</Text>
        </VStack>

        <VStack>
          {dataList.map(item => (
            <CenterButton key={item.id} py={20} mb={4}>
              <Text>{item.name}</Text>
            </CenterButton>
          ))}
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default VoteMain;
