import React, {useState} from 'react';
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

interface Props {
  index: number;
}
function VoteItem({index}: Props) {
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
      borderTopWidth={index === 0 ? 1 : 0}
      borderBottomWidth={1}
      borderColor={colors.gray[40]}>
      <HStack w="auto">
        <Center w="auto" mr={13} gap={index < 3 ? 4 : 0}>
          {index < 3 ? crowns[index] : <></>}
          <CustomText
            color={index < 3 ? rankColor[index] : colors.gray[80]}>{`${
            index + 1
          } 위`}</CustomText>
        </Center>

        <VStack
          mr={19}
          w={28}
          h={28}
          borderRadius={28}
          bgColor={colors.gray[60]}
        />

        <CustomText mr={21} fontWeight={'bold'}>
          나루토
        </CustomText>
        <CustomText color={colors.gray[70]}>947표</CustomText>
      </HStack>

      <CenterButton w="auto" flexDirection="row">
        <CustomText>투표</CustomText>

        <IconRight16 />
      </CenterButton>
    </HStack>
  );
}

export default VoteItem;
