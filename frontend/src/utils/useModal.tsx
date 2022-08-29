import { useCallback, useState } from 'react';
import Modal from '../styleComponents/Modal';

export const useModal = ({
  content,
  heading,
}: {
  content?: JSX.Element;
  heading?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>();

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen);
    document.body.style.overflow = 'unset';
    if (content && isOpen === false) {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }

      setModalContent(content);
    }
  }, [content, isOpen]);

  const renderModal = () => {
    return (
      <Modal
        ariaLabelID="dialog1_label"
        handleModal={handleModal}
        heading={heading}
        isOpen={isOpen}
        modalContent={modalContent}
      />
    );
  };

  return { handleModal, isOpen, modal: renderModal(), modalContent };
};
