import {useState} from 'react';

/**
 *@description actionsheet open/close hook
 */
function useActionsheet(defaultIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    onOpen,
    onClose,
    isOpen,
  };
}

export default useActionsheet;
