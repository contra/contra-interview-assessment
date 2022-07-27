import styled from 'styled-components';
import tw from 'twin.macro';

export const UserContainer = styled.div`
  ${tw`
    flex
    flex-col
    flex-nowrap
    items-center
    relative
    py-14
    px-8
    w-full
    bg-white/[0.4]
    lg:min-w-[416px]
    lg:max-w-lg
    xl:my-8
    xl:rounded-2xl
  `}
`;

export const StickyContainer = styled.div`
  ${tw`
    flex
    flex-col
    flex-nowrap
    items-center
    w-full
    max-w-sm
    gap-y-1.5
    lg:sticky
    lg:top-36
  `}
`;

export const AvatarContainer = styled.div`
  ${tw`
    max-w-[144px]
    lg:max-w-[208px]    
  `}
`;

export const TextContainer = styled.div`
  ${tw`
    flex
    w-full
    my-2
    justify-center
    items-center
    text-center
  `}
`;

export const BadgeContainer = styled.div`
  ${tw`
    mx-2
  `}
`;

export const FullName = styled.h1`
  ${tw`
    text-3xl
    font-bold
    text-white
    sm:text-4xl
    font-sans
  `}
  background: radial-gradient(
    189.37% 1750.88% at 1.77% 108.13%,
    rgb(97, 166, 242) 1.56%,
    rgb(143, 111, 219) 23.44%,
    rgb(255, 90, 94) 33.12%,
    rgb(242, 201, 76) 52%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ProfileTitleContainer = styled(TextContainer)`
  ${tw`
    lg:hidden
  `};
`;

export const ProfileTitle = styled.p`
  ${tw`
    text-xl
  `}
`;

export const BoxTagGroup = styled.div`
  ${tw`
    inline-flex
    flex-wrap
    justify-center
    gap-y-2
  `}
`;

export const BoxTag = styled.div`
  ${tw`
    inline-flex
    items-center
    h-8
    w-auto
    whitespace-nowrap
    mx-1.5
    py-2.5
    px-3
    bg-white
    rounded-2xl
    lg:h-10
    lg:rounded-3xl
  `}
`;

export const BoxTagText = styled.span`
  ${tw`
    flex
    flex-grow
    text-xs
    font-sans
    lg:text-sm
  `}
`;

export const ButtonWrapper = styled.div`
  ${tw`
    w-full
  `}
`;

export const GetInTouchButton = styled.button`
  ${tw`
    flex
    items-center
    justify-center
    gap-x-2
    text-white
    bg-black
    text-center
    w-full
    cursor-pointer
    h-12
    px-6
    rounded-3xl
  `}
`;

export const ButtonText = styled.span`
  ${tw`
    font-semibold
    font-sans
  `}
`;

export const BioText = styled.p`
  ${tw`
    text-sm
    font-sans
  `}
`;

export const LocationContainer = styled.div`
  ${tw`
    inline-flex
    justify-center
    items-center
    gap-x-2
  `}
`;

export const TextLocation = styled.p`
  ${tw`
    text-sm
    font-sans
  `}
`;

export const SocialContainer = styled.div`
  ${tw`
    flex
    gap-x-3
  `}
`;
