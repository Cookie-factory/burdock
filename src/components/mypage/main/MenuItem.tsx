import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';
import IconRight32 from '~/assets/icons/IconRight32.svg';

interface Props {
  name: string;
  url: any;
}
function MenuItem({name, url}: Props) {
  const {navigate} = useNavigate();
  return (
    <CenterButton
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      h={72}
      px={20}
      borderBottomWidth={1}
      borderBottomColor={colors.gray[40]}
      onPress={() => navigate(url)}>
      <Text fontSize={16} color={colors.gray[80]} fontWeight={'bold'}>
        {name}
      </Text>

      <IconRight32 />
    </CenterButton>
  );
}

export default MenuItem;
