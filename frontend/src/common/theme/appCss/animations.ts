import { css } from './common'

export const animations = {
  fadeIn: css`
    @keyframes fadeInOpacity {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.4s;
  `,
}
