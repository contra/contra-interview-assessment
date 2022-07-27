import styled from 'styled-components';
import tw from 'twin.macro';

export const ProjectsContainer = styled.div`
  ${tw`
    m-8
    flex-1
    lg:my-14
    lg:ml-16
    lg:mr-28
    lg:min-w-[440px]
    lg:min-h-[700px]
    xl:min-w-[640px]
  `}
`;

export const ProfileTitleContainer = styled.div`
  ${tw`
    w-full
    hidden
    lg:block
    font-sans
  `}
`;

export const ProfileTitle = styled.p`
  ${tw`
    text-4xl
    leading-relaxed
    font-bold
    xl:text-5xl
    xl:leading-tight
  `}
`;

export const CreateProjectContainer = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    items-center
    max-w-sm
    h-auto
    p-4
    rounded-2xl
    bg-white
    xl:flex-row
    xl:max-w-full
    xl:px-12
    xl:py-8
    xl:gap-x-16
  `}
`;

export const ProjectCardsContainer = styled.div`
  ${tw`
    flex-1
    mt-6
    flex
    justify-center
  `}
`;

export const ProjectCards = styled.div`
  ${tw`
    relative
    flex
    flex-col
    gap-y-5
    gap-x-5
    md:grid
    md:grid-cols-2
    lg:flex
    lg:justify-center
  `}
`;

export const CardButtonWrapper = styled.div`
  ${tw`
    max-w-[240px]
  `}
`;

export const CreateProjectButton = styled.button`
  ${tw`
    w-20
    h-20
    p-0.5
    rounded-full
    background-image[linear-gradient(250deg, #ff9e31 28%, #f2c94c 85%)]
  `}

  p {
    ${tw`
      flex
      items-center
      justify-center
      text-2xl
      w-full
      h-full
      bg-white
      rounded-full
      transition-all
      hover:background-image[linear-gradient(250deg, #ff9e31 28%, #f2c94c 85%)]
    `}
  }
`;

export const CreateProjectTitle = styled.span`
  ${tw`
    
    text-2xl
    font-semibold
    xl:text-4xl
    xl:font-bold
    font-sans
  `}
`;

export const Card = styled.div`
  ${tw`
    relative
    flex
    flex-col
    justify-center
    max-w-sm
    h-auto
    p-4
    rounded-2xl
    bg-white
    xl:flex-row
    xl:max-w-full
    xl:p-8
    xl:gap-x-5
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

export const CardImage = styled.img`
  ${tw`
    rounded-xl
    xl:max-w-[240px]
    xl:max-h-[240px]
  `}
`;

export const CardDetails = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    my-3
    gap-y-2
    xl:my-0
    xl:gap-y-4
  `}
`;

export const CardDetailsCreate = styled(CardDetails)`
  ${tw`
    text-center
    xl:text-left
  `}
`;

export const CardDetailsTitle = styled.span`
  ${tw`
    text-2xl
    font-semibold
    xl:text-4xl
    xl:font-bold
    font-sans
  `}
`;

export const CardDetailsDescription = styled.p`
  ${tw`
    text-base
    font-sans
  `}
`;
