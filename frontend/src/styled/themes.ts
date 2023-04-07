const defaultTheme = {
  colors: {
    darkGrey: '#4F4F4F',
    grey: '#DEE2E6',
    opaqueDark: 'rgba(0, 0, 0, 0.5)',
    white: '#fff',
  },
  device: {
    mobile: 'max-width: 425px',
    tablet: '(max-width: 820px) and (min-width: 425px)',
  },
  fontSize: {
    large: '18px',
    larger: '20px',
    regular: '16px',
    small: '14px',
    tiny: '12px',
    xl: '22px',
    xxl: '24px',
    xxxl: '26px',
  },
  lineHeight: {
    large: '24px',
    regular: '22px',
    small: '16px',
  },
  radius: {
    regular: '8px',
    rounded: '29px',
  },
  shadow: {
    focus: '0 0 0 2px #6b6bec',
    primary: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
  },
  zIndex: {
    aboveAll: 999,
  },
};

const lightTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    bodyBackground: '#fff',
    bodyText: '#4F4F4F',

    modalBackground: '#fff',
    modalText: 'rgba(84, 89, 94, 0.6)',
    modalTitle: '#54595E',
  },
};

const darkTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    bodyBackground: '#4F4F4F',
    bodyText: '#fff',

    modalBackground: '#323232',
    modalText: 'rgba(222, 226, 230, 0.6)',
    modalTitle: '#DEE2E6',
  },
};

export { lightTheme, darkTheme };
