import { useCallback, useState } from "react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function useDisclosure(options: Partial<Props> = {}) {
  const {
    isOpen: defaultIsOpen = false,
    onOpen = () => {},
    onClose = () => {},
  } = options;
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const handleOpen = useCallback(() => {
    onOpen();
    setIsOpen(true);
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setIsOpen(false);
  }, [onClose]);

  const handleToggle = useCallback(
    (targetOpen?: boolean) => {
      if (targetOpen === true) {
        handleOpen();
      } else if (targetOpen === false) {
        handleClose();
      } else {
        setIsOpen((prev) => !prev);
      }
    },
    [handleOpen, handleClose]
  );

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };
}
