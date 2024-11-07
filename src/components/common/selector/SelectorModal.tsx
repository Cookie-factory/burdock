import React from 'react';
import CustomModalContent from '~/components/common/modal/ModalContent';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import {SelectorItem as SelectorItemType} from '~/types/components/common/selector';
import SelectorItem from './SelectorItem';
import CustomActionSheet from '../modal/CustomActionSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  list: SelectorItemType[];
  selectedItem?: SelectorItemType;
  onSelect: (selectedItem: SelectorItemType) => void;
  height: number;
  title?: string;
}

/**
 *@description 셀랙터 모달
 */
function CustomSelectorActionSheet({
  isOpen,
  onClose,
  list,
  onSelect,
  selectedItem,
  height,
  title,
}: Props) {
  const onSelectItem = (selectedItem: SelectorItemType) => {
    onSelect(selectedItem);
    onClose();
  };

  return (
    <CustomActionSheet isOpen={isOpen} onClose={onClose}>
      <CustomModalContent
        height={height}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}>
        <VStack flex={1} justifyContent="space-between">
          <VStack>
            {title && (
              <CustomText fontSize={14} fontWeight={'bold'} mb={24}>
                {title}
              </CustomText>
            )}

            {list.map((_item, i) => (
              <React.Fragment key={i}>
                <SelectorItem
                  data={_item}
                  onSelectItem={onSelectItem}
                  selectedItem={selectedItem}
                />
              </React.Fragment>
            ))}
          </VStack>
        </VStack>
      </CustomModalContent>
    </CustomActionSheet>
  );
}

export default CustomSelectorActionSheet;
