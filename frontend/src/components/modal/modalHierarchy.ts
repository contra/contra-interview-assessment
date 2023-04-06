import { useEffect, useId } from 'react';

/**
 * Used for verifying what's the top modal - the one
 *    that should be closed in operations like pressing Esc, etc.
 */
class ModalHierarchy {
  public modalIds: string[] = [];

  public add(modalId: string) {
    this.modalIds.push(modalId);
  }

  public remove(modalId: string) {
    this.modalIds = this.modalIds.filter((id) => id !== modalId);
  }

  public isTopModal(modalId: string) {
    if (!this.modalIds.length) {
      return false;
    }

    return this.modalIds[this.modalIds.length - 1] === modalId;
  }
}

export const modalHierarchy = new ModalHierarchy();

export const useModalId = () => {
  /**
   * We're using React IDs as they're guaranteed to be
   *  different across different rendered React nodes
   */
  const modalId = useId();

  useEffect(() => {
    modalHierarchy.add(modalId);
    return () => {
      modalHierarchy.remove(modalId);
    };
  }, [modalId]);

  return modalId;
};
