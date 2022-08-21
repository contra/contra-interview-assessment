import { isNotUndefined, removeItemFromArray } from '../../utils';

export type ModalStackItem = HTMLElement;

type SubscriberFunction = (item?: ModalStackItem) => void;

class ModalStack {
  private modalStack: ModalStackItem[] = [];

  private subscribers: SubscriberFunction[] = [];

  private static instance: ModalStack;

  private constructor() {}

  public static getInstance() {
    if (!isNotUndefined(ModalStack.instance)) {
      ModalStack.instance = new ModalStack();
    }

    return ModalStack.instance;
  }

  private updateModalStack(event: 'add' | 'remove', item: ModalStackItem) {
    if (event === 'add') {
      this.modalStack.unshift(item);
    } else {
      this.modalStack = removeItemFromArray(this.modalStack, item);
    }

    this.notifyOnModalStackTopItemChange(this.modalStack[0]);
  }

  private notifyOnModalStackTopItemChange(newTopItem?: ModalStackItem) {
    this.subscribers.forEach((function_) => function_(newTopItem));
  }

  public add(item: ModalStackItem) {
    this.updateModalStack('add', item);
  }

  public remove(item: ModalStackItem) {
    this.updateModalStack('remove', item);
  }

  public isAtTop(item: ModalStackItem) {
    return this.modalStack[0] === item;
  }

  public length() {
    return this.modalStack.length;
  }

  public onTopChange(subscriberFunction: SubscriberFunction) {
    this.subscribers.push(subscriberFunction);
    return () => {
      removeItemFromArray(this.subscribers, subscriberFunction);
    };
  }
}

export const modalStack = ModalStack.getInstance();
