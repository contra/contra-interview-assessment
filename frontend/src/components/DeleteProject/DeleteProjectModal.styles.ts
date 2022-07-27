import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`
    flex
    flex-col
    gap-y-2
    justify-center
    items-center
    md:min-w-[512px]
  `}
`;

export const HeaderTitle = styled.h1`
  ${tw`
    text-4xl
    font-bold
    tracking-tight
    max-w-md
    text-center
    pb-2
    lg:pb-4
  `}
`;

export const SubTitle = styled.p`
  ${tw`
    max-w-xs
    text-gray-500
    text-center
  `}
`;

export const CardDeleteButtonContainer = styled.div`
  ${tw`
    absolute
    top-2
    right-2
    flex
    justify-center
    items-center
    rounded-full
    w-12
    h-12
    bg-gray-100
    transition-all
    cursor-pointer
    hover:bg-gray-200
    xl:top-3
    xl:right-3
  `}
`;

export const CardDeleteButton = styled.button`
  ${tw`
    font-semibold
    text-xs
    text-red-500
  `}
`;
