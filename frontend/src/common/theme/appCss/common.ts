import { css as cssBase, ThemedCssFunction } from 'styled-components';

// prevents circular definition since:
// - type for `css` is  ThemedCssFunction<DefaultTheme>
// - theme will be used to define DefaultTheme
export const css = cssBase as ThemedCssFunction<{}>;
