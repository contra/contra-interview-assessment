import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      light: {
        powderWhite: string;
        primary: string;
        secondary: string;
        accent: string;
        onyx: string;
      },
      dark: {
        powderWhite: string;
        primary: string;
        secondary: string;
        accent: string;
        onyx: string;
      }
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    ...
  }
}