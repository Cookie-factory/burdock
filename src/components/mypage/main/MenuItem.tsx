import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import useNavigate from '~/hooks/navigator/useNavigation';

interface Props {
  name: string;
  url: any;
}
function MenuItem({name, url}: Props) {
  const {navigate} = useNavigate();
  return (
    <CenterButton
      h={42}
      marginVertical={10}
      borderWidth={1}
      onPress={() => navigate(url)}>
      <Text>{name}</Text>
    </CenterButton>
  );
}

export default MenuItem;
