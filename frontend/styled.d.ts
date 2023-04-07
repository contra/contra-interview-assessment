// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StyledTypes from '@types/styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefaultTheme extends StyledTypes {
    colors: {
      bodyBackground: string;
      bodyText: string;
      darkGrey: string;
      grey: string;
      modalBackground: string;
      modalText: string;
      modalTitle: string;
      opaqueDark: string;
      white: string;
    };
    device: {
      mobile: string;
      tablet: string;
    };
    fontSize: {
      large: string;
      larger: string;
      regular: string;
      small: string;
      tiny: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    lineHeight: {
      large: string;
      regular: string;
      small: string;
    };
    radius: {
      regular: string;
      rounded: string;
    };
    shadow: {
      focus: string;
      primary: string;
    };
    zIndex: {
      aboveAll: number;
    };
  }
}
