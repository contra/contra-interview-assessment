import styled from 'styled-components';
import tw from 'twin.macro';

export const ModalOverlay = styled.div<{ animated: boolean }>`
  ${tw`
    fixed
    top-0
    left-0
    z-index[1000]
    w-screen
    h-screen
    bg-black/[.4]
  `}
  ${({ animated }) =>
    animated &&
    `
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: fadeIn;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}
`;

export const ModalWrapper = styled.div<{ animated: boolean }>`
  ${tw`
    fixed
    top-0
    left-0
    w-full
    h-full
    flex
    items-center
    justify-center
    overflow-x-hidden
    overflow-y-auto
    outline-none
    backdrop-blur-[2px]
    z-index[1050]
  `}
  ${({ animated }) =>
    animated &&
    `
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: fadeIn;
  `}
`;

export const ModalContainer = styled.div<{ animated: boolean }>`
  ${tw`
    z-index[100]
    bg-white
    relative
    rounded-2xl
    mx-4
    p-8
    md:p-12
  `}
  ${({ animated }) =>
    animated &&
    `
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: fadeIn, rising;
    @keyframes rising {
      from {
        transform: translate3d(0, 30%, 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
    }
  `}
`;

export const ModalHeader = styled.div`
  ${tw`
    
    flex
    justify-end
  `}
`;

export const ModalCloseButton = styled.button`
  ${tw`
    absolute
    top-2
    right-8 
    text-3xl
    font-semibold
    font-sans
    text-black
    opacity-30
    cursor-pointer
    border-none
  `}
`;
