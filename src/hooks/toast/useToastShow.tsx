import Toast, {ToastShowParams} from 'react-native-toast-message';

/**
 *@description toast 출력 hook
 */
function useToastShow() {
  const onShowToast = (option: ToastShowParams) => {
    Toast.show({visibilityTime: 2500, ...option});
  };

  const onHideToast = () => {
    Toast.hide();
  };

  return {
    onShowToast,
    onHideToast,
  };
}

export default useToastShow;
