import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import Center from '../common/view/Center';

interface Props {
  onPress: (id: string) => void;
  isActive: boolean;
  name: string;
  id: string;
  source: string;
  profile?: string;
}

/**
 *@description 캐릭터 선택 항목
 */
function CharacterItem({onPress, isActive, name, id, source, profile}: Props) {
  return (
    <CenterButton onPress={() => onPress(id)}>
      <HStack mb={12} justifyContent="space-between">
        <HStack w="auto" gap={18}>
          <VStack
            w={44}
            h={44}
            borderRadius={50}
            bgColor={colors.gray[70]}></VStack>

          <VStack w="auto" gap={4} alignItems="flex-start">
            <CustomText
              color={colors.gray[80]}
              fontSize={14}
              fontWeight={'bold'}>
              {name}
            </CustomText>

            <CustomText color={colors.gray[70]} fontSize={10}>
              {source}
            </CustomText>
          </VStack>
        </HStack>

        <Center
          borderRadius={8}
          w={106}
          h={32}
          borderWidth={1}
          borderColor={isActive ? colors.positive[0] : colors.gray[50]}>
          <CustomText
            fontWeight={'bold'}
            color={isActive ? colors.positive[0] : colors.gray[50]}>
            선택
          </CustomText>
        </Center>
      </HStack>
    </CenterButton>
  );
}

export default CharacterItem;
