export type ModalProps = {
  isOpen: boolean;
};

export const Modal = (props: ModalProps) => {
  const { isOpen } = props;

  if (!isOpen) {
    return null;
  }

  return <div>I'm a modal, I swear!</div>;
};
