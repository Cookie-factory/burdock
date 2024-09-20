import {useRoute} from '@react-navigation/native';
import {RootStackParamList, RouteHookProp} from '~/types/navigator';

/**
 *@description useRoute hook 재정의
 */

function useParam<T extends keyof RootStackParamList>(page: T) {
  const {params} = useRoute<RouteHookProp<T>>();

  return params;
}

export default useParam;
