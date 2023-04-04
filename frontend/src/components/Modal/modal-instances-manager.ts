import { useEffect, useState } from 'react';

class ModalInstancesManager {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private modals: Map<string, number>;

  public constructor() {
    this.modals = new Map();
  }

  public add(modalId: string): number {
    this.modals.set(modalId, this.modals.size + 1);
    return this.modals.size;
  }

  public remove(modalId: string): void {
    this.modals.delete(modalId);
  }

  public isTopModal(modalId: string | null): boolean {
    if (!modalId) return false;
    return this.modals.get(modalId) === this.modals.size;
  }

  public hasActiveModals(): boolean {
    return Boolean(this.modals.size);
  }
}

export const manager = new ModalInstancesManager();

export const useModalManager = (modalId: string, isOpen?: boolean) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const modalIndex = manager.add(modalId);
      setIndex(modalIndex);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      manager.remove(modalId);
      setIndex(0);
    };
  }, [isOpen, modalId]);

  return index;
};
