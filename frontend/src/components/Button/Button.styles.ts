import styled from 'styled-components';
import tw from 'twin.macro';

export const DefaultButton = styled.div<{ isCancel?: boolean }>`
  ${tw`
    inline-block
    text-center
    capitalize
    w-full
    h-12
    px-6
    rounded-3xl
    cursor-pointer
    transition-all
    bg-yellow-300
    hover:bg-yellow-200
    lg:w-auto
    lg:min-w-[164px]
  `}
`;

export const CancelButton = styled(DefaultButton)`
  ${tw`
    bg-gray-100
    hover:bg-gray-200
  `}
`;

export const DestructiveButton = styled(DefaultButton)`
  ${tw`
    bg-red-600
    text-white
    hover:bg-red-700
  `}
`;

export const ButtonText = styled.span`
  ${tw`
    flex
    items-center
    justify-center
    h-full
    font-semibold
  `}
`;
