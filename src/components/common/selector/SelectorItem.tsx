import React from 'react';
import CenterButton from '../button/CenterButton';
import CustomText from '../text/Text';
import {SelectorItem as SelectorItemType} from '~/types/components/common/selector';
import {Icon} from 'react-native-paper';
import {colors} from '~/constants/style';

interface Props {
  data: SelectorItemType;
  selectedItem?: SelectorItemType;
  onSelectItem: (selectedItem: SelectorItemType) => void;
}

/**
 *@description 셀렉터 내부 리스트 항목
 */
function SelectorItem({data, selectedItem, onSelectItem}: Props) {
  return (
    <CenterButton
      h={50}
      px={18}
      mb={12}
      flexDirection="row"
      justifyContent="flex-start"
      borderBottomWidth={1}
      borderBottomColor={
        selectedItem?.value === data.value
          ? colors.negative[20]
          : colors.gray[40]
      }
      onPress={() => onSelectItem(data)}>
      <Icon
        color={
          selectedItem?.value === data.value
            ? colors.negative[20]
            : colors.gray[40]
        }
        source={
          selectedItem?.value === data.value
            ? 'check-circle'
            : 'check-circle-outline'
        }
        size={20}
      />
      <CustomText ml={14}>{data.text}</CustomText>
    </CenterButton>
  );
}

export default SelectorItem;
