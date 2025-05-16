import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import Center from '~/components/common/view/Center';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import IconRight16 from '~/assets/icons/IconRight16.svg';
import IconGoldCrown21 from '~/assets/icons/IconGoldCrown21.svg';
import IconSilverCrown21 from '~/assets/icons/IconSilverCrown21.svg';
import IconBronzeCrown21 from '~/assets/icons/IconBronzeCrown21.svg';
import {RankVoteItem} from '~/types/api/vote';
import CustomImage from '~/components/common/image/Image';

interface Props {
  onVoteModalOpen: (id: string) => void;
  data: RankVoteItem;
}

/**
 *@description 투표 항목 및 뷰
 */
function VoteItem({onVoteModalOpen, data}: Props) {
  const {rank, name, totalVotes, sourceName} = data;
  const crowns = [
    <IconGoldCrown21 />,
    <IconSilverCrown21 />,
    <IconBronzeCrown21 />,
  ];

  const rankColor = ['#FFD700', '#C0C0C0', '#CD7F32'];
  return (
    <HStack
      justifyContent="space-between"
      py={14}
      borderTopWidth={rank === 1 ? 1 : 0}
      borderBottomWidth={1}
      borderColor={colors.gray[40]}>
      <HStack w="auto">
        <Center w="auto" mr={13} gap={rank < 4 ? 4 : 0}>
          {rank < 4 ? crowns[rank - 1] : <></>}
          <CustomText
            color={
              rank < 4 ? rankColor[rank - 1] : colors.gray[80]
            }>{`${rank} 위`}</CustomText>
        </Center>

        <CustomImage
          borderWidth={1}
          borderColor={colors.gray[30]}
          mr={19}
          w={28}
          h={28}
          borderRadius={28}
          source={{uri: data.profile}}
        />

        <CustomText mr={6} fontWeight={'bold'}>
          {name}
        </CustomText>

        <CustomText mr={21} fontSize={9} color={colors.gray[50]}>
          ({sourceName})
        </CustomText>

        <CustomText color={colors.gray[70]}>{totalVotes}표</CustomText>
      </HStack>

      <CenterButton
        w="auto"
        flexDirection="row"
        onPress={() => onVoteModalOpen(data.id)}>
        <CustomText>투표</CustomText>

        <IconRight16 />
      </CenterButton>
    </HStack>
  );
}

export default VoteItem;
