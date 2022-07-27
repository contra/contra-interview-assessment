import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
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
    bg-gray-100
    z-index[2000]
  `}
`;
