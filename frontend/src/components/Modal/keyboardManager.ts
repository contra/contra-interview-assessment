
export class KeyboardManager {
  private subscribed = false;

  constructor() {
    this.subscribe();
  }

  private registeredKeys: { [key: string]:  ((e: KeyboardEvent) => void)[] } = {}

  private handleKey(event: KeyboardEvent) {
    let key = event.key;
    const keys = this.registeredKeys[key];

    if (keys && keys.length > 0) {
      const func = keys[keys.length - 1];
      func && func(event);
    }
  }

  subscribe() {
    if (typeof window !== 'undefined' && document && !this.subscribed) {
      this.subscribed = true;
      document.addEventListener('keyup', (e) => this.handleKey(e), false);
    }
  }

  unsubscribe() {
    document.removeEventListener('keyup', (e) => this.handleKey(e), false);
  }

  register(key: string, func: (e: KeyboardEvent) => void) {
    if (!this.subscribed) {
      this.subscribe();
    }
    if (!this.registeredKeys[key]) {
      this.registeredKeys[key] = [];
    }
    this.registeredKeys[key]?.push(func)
  }

  unregister(key: string, func: (e: KeyboardEvent) => void) {
    if (this.registeredKeys[key]) {
      this.registeredKeys[key] = this.registeredKeys[key]?.filter(f => f !== func) || [];
    }
  }
}

export default new KeyboardManager();