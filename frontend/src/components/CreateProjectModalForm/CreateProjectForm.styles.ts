import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`

  `}
`;

export const HeaderTitle = styled.h1`
  ${tw`
    text-4xl
    font-bold
    tracking-tight
    w-full
    text-center
    pb-2
    // font-sans
    lg:pb-4
  `}
`;

export const SubTitle = styled.p`
  ${tw`
    text-gray-500
    text-center
  `}
`;

export const FormContainer = styled.div`
  ${tw`
    flex
    flex-col
    mt-12
    mb-6
  `}
`;

export const ErrorMessage = styled.span`
  ${tw`
    my-2
    text-red-500
    text-sm
  `}
`;

export const TextFieldTitle = styled.textarea`
  ${tw`
    w-full
    text-4xl
    font-bold
    tracking-tight
    border-b
    border-b-black
    outline-none
    overflow-hidden
  `}
`;

export const TextField = styled.div`
  ${tw`
    flex
    flex-col
    min-h-[100px]
    w-full
    mt-10
    border
    border-b-black
    rounded-t-lg
    outline-none
  `}
`;

export const TextFieldLabel = styled.label`
  ${tw`
    mt-1.5
    ml-4
    text-xs
    justify-self-start
  `}
`;

export const TextFieldArea = styled.textarea`
  ${tw`
    flex-1
    mt-2
    ml-3.5
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
