import { renderHook, act } from '@testing-library/react-hooks';
import { useModal } from '../useModal';

describe('useModal', () => {
  it('should close modal on Escape key press', () => {
    const onClose = jest.fn();
    renderHook(() => useModal(true, onClose));

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
    });

    expect(onClose).toHaveBeenCalledWith();
  });

  it('should not close modal on other key press', () => {
    const onClose = jest.fn();
    renderHook(() => useModal(true, onClose));

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should set overflow style on body when modal is open', () => {
    renderHook(() => useModal(true, () => {}));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should reset overflow style on body when modal is closed', () => {
    const { rerender } = renderHook(
      ({ isOpen, onClose }) => useModal(isOpen, onClose),
      {
        initialProps: {
          isOpen: true,
          onClose: () => {},
        },
      }
    );

    rerender({ isOpen: false, onClose: () => {} });

    expect(document.body.style.overflow).toBe('unset');
  });
});
