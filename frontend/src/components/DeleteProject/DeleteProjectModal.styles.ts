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

export const FormContainer = styled.div`
  ${tw`
    mt-12
    mb-6
  `}
`;

export const SectionContainer = styled.div`
  ${tw`
    w-full
    bg-gray-100
    p-3
    flex
    min-h-[44px]
    justify-between
    mb-6
    items-center
    rounded-[10px]
  `}

  p {
    ${tw`
      text-[10px]
      font-semibold
      text-gray-900
      uppercase
      tracking-widest
    `}
  }
`;

export const MessageArea = styled.textarea`
  ${tw`
    flex-1
    min-h-[126px]
    p-2
    w-full
    border
    border-b-black
    rounded-t-lg
    outline-none
  `}
`;

export const ButtonGroup = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    items-center
    mt-6
    gap-y-4
    lg:mt-8
  `}
`;

export const FooterText = styled.p`
  ${tw`
    text-xs
    max-w-lg
    text-center
    mx-auto
    text-gray-500
  `}
`;
