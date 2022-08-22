import { useEffect, Ref } from "react"

class ModalManager {
  modals: any[]
  previouslyFocusedElements: any[];

  constructor() {
    this.modals = [];
    this.previouslyFocusedElements = [];
  }

  add(modal: any) {
    this.modals.push(modal);
    this.previouslyFocusedElements.push(document.activeElement);
  }

  remove(modal: any) {
    this.modals = this.modals.filter((_modal) => _modal !== modal)
  }

  getTopModal() {
    return this.modals[this.modals.length - 1]
  }

  manageFinalFocus(){
    return this.previouslyFocusedElements.pop()
  }

  getFocusableElements(){
    return this.previouslyFocusedElements;
  }

  isTopModal(modal: any) {
    const topmostModal = this.modals[this.modals.length - 1]
    return topmostModal === modal
  }

  isLastModal() {
    return this.modals.length === 1
  }

  hasModals() {
    return this.modals.length > 0
  }
}

export const manager = new ModalManager()

export function useModalManager(ref: Ref<any>, isOpen?: boolean) {
  useEffect(() => {
    if (isOpen) {
      manager.add(ref)
    }
    return () => {
      manager.remove(ref)
    }
  }, [isOpen, ref])
}