import 'styled-components';
import { ThemeType } from '.';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
