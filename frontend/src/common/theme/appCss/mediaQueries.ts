export const mediaQueryBreakpoints = {
  desktop: '(min-width: 1051px)',
  mobile: '(max-width: 1050px)',
  verticalDisplay: '(max-width: 1279px)',
  verticalDisplaySmall: '(max-height: 980px) and (max-width: 1279px)',
}

export const mediaQueries = {
  desktop: `@media all and ${mediaQueryBreakpoints.desktop}`,
  mobile: `@media all and ${mediaQueryBreakpoints.mobile}`,
  verticalDisplay: `@media all and ${mediaQueryBreakpoints.verticalDisplay}`,
  verticalDisplaySmall: `@media all and ${mediaQueryBreakpoints.verticalDisplay}`,
}
