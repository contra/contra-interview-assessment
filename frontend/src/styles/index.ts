import { CSSProperties } from 'react';

export const styles: Record<
  string,
  CSSProperties | Record<string, CSSProperties>
> = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 1000,
    background: 'rgb(0 0 0 / 50%)',
  },
  modal: {
    top: '12.5vw',
    width: '50vw',
    minHeight: '50vh',
    margin: '0 auto',
    borderRadius: 16,
    padding: 16,
    boxShadow: 'rgb(0 0 0 / 75%) 1px 8px 32px -4px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 180,
    width: '100%',
  },
  modalCloseButton: {
    border: 'none',
    position: 'absolute',
    right: 4,
    top: 4,
  },
  button: {
    padding: '8px 16px',
    borderRadius: 4,
    border: '2px solid #bebebe',
    boxShadow: 'rgb(0 0 0 / 50%) 1px 2px 4px -2px',
  },

  centerChildren: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
};
