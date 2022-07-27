import styled from 'styled-components';
import tw from 'twin.macro';

export const HeaderContainer = styled.div`
  ${tw`
    w-full
    fixed
    z-50
    bg-white/[0.7]
    border-b
    backdrop-blur
  `}
`;

export const Navbar = styled.div`
  ${tw`
    flex
    items-center
    max-w-[1440px]
    py-4
    px-8
    mx-auto
    lg:py-5
  `}
`;
