import {useCallback, useState} from 'react';

/**
 *@description modal open event, close event, isOpen state return hook
 */
function useModalOpen(isDefaultOpen: boolean) {
  const [isModalOpen, setModalOpen] = useState(isDefaultOpen);

  const onModalOpen = useCallback(() => {
    setModalOpen(true);
  }, [isModalOpen]);

  const onModalClose = useCallback(() => {
    setModalOpen(false);
  }, [isModalOpen]);

  return {
    isModalOpen,
    onModalOpen,
    onModalClose,
  };
}

export default useModalOpen;
