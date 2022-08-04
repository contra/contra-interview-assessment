import KeyboardManager from './keyboardManager';

describe('KeyboardManager', () => {
  beforeEach(() => {
    KeyboardManager.registeredKeys = {};
  });

  it('register', () => {
    const func = jest.fn();
    const key = 'test';
    KeyboardManager.register(key, func);

    expect(KeyboardManager.registeredKeys[key]).toBeTruthy();
    // @ts-ignore
    expect(KeyboardManager.registeredKeys[key][0]).toBe(func)
  });

  it('unregister', () => {
    const func = jest.fn();
    const key = 'test';
    KeyboardManager.register(key, func);

    expect(KeyboardManager.registeredKeys[key]).toBeTruthy();
    // @ts-ignore
    expect(KeyboardManager.registeredKeys[key][0]).toBe(func);

    KeyboardManager.unregister(key, func);

    expect(KeyboardManager.registeredKeys[key]).toBeTruthy();
    // @ts-ignore
    expect(KeyboardManager.registeredKeys[key]).not.toContain(func);

  });
});
