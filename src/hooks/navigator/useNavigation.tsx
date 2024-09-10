import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/types/navigator';

/**
 *@description navigate hook 재정의
 */

function useNavigate() {
  const navigate = useNavigation<NavigationHookProp>();

  return navigate;
}

export default useNavigate;
