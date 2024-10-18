import {useIsFocused} from '@react-navigation/native';
import {DependencyList, EffectCallback, useEffect} from 'react';

/**
 *@description side effect occur if focus screen
 */
function useFocusScreen(effect: EffectCallback, deps?: DependencyList) {
  const isFocus = useIsFocused();

  useEffect(effect, [isFocus, ...(deps ?? [])]);

  return;
}

export default useFocusScreen;
