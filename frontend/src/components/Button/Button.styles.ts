import styled from 'styled-components';
import tw from 'twin.macro';

export const DefaultButton = styled.button`
  ${tw`
    flex
    items-center
    justify-center
    capitalize
    w-full
    h-12
    rounded-3xl
    cursor-pointer
    transition-all
    bg-yellow-300
    hover:bg-yellow-200
    disabled:bg-yellow-200
    disabled:text-gray-700
    disabled:cursor-not-allowed
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
    disabled:bg-red-900
    disabled:text-gray-300
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
