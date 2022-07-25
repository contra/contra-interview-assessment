import React, { Suspense } from 'react';
import { useModal } from '@/hooks/useModal';
const Modal = React.lazy(() => import('@/hooks/useModal'));
import {
  Badge,
  BadgeUnchecked,
  ChatIcon,
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
  LocationIcon,
  TwitterIcon,
} from '@/components/SVGIcons';
import { userData } from '@/data/projectsData';
import { GetInTouchModalForm } from '@/components/GetInTouchModalForm';
import {
  UserContainer,
  StickyContainer,
  Avatar,
  FullName,
  TextContainer,
  ProfileTitle,
  BoxTag,
  BoxTagText,
  BadgeContainer,
  BoxTagGroup,
  ButtonWrapper,
  GetInTouchButton,
  ButtonText,
  BioText,
  LocationContainer,
  TextLocation,
  SocialContainer,
  ProfileTitleContainer,
} from './UserSidebar.styles';

export function UserSidebar() {
  if (!userData) return <div>Loading...</div>;

  return (
    <UserContainer>
      <StickyContainer>
        <Avatar src={userData.imageUrl} />
        <TextContainer>
          <FullName>{userData.name}</FullName>
          <BadgeContainer>
            {userData.verifiedAccount ? <Badge /> : <BadgeUnchecked />}
          </BadgeContainer>
        </TextContainer>
        <ProfileTitleContainer>
          <ProfileTitle>{userData.profileTitle}</ProfileTitle>
        </ProfileTitleContainer>
        <TextContainer>
          <BoxTagGroup>
            {userData.tags.map((tag) => (
              <BoxTag key={tag} className="shadow-xl shadow-cyan-100/30">
                <BoxTagText>{tag}</BoxTagText>
              </BoxTag>
            ))}
          </BoxTagGroup>
        </TextContainer>
        <TextContainer>
          <ButtonWrapper>
            <GetInTouch />
          </ButtonWrapper>
        </TextContainer>
        <TextContainer>
          <BioText>{userData.bio}</BioText>
        </TextContainer>
        <TextContainer>
          <LocationContainer>
            <LocationIcon />
            <TextLocation>{userData.location}</TextLocation>
          </LocationContainer>
        </TextContainer>
        <TextContainer>
          <SocialContainer>
            <GithubIcon />
            <LinkedinIcon />
            <DribbbleIcon />
            <TwitterIcon />
          </SocialContainer>
        </TextContainer>
      </StickyContainer>
    </UserContainer>
  );
}

const GetInTouch = () => {
  const [modalOptions, toggle] = useModal({
    animated: true,
    message: "Hello, I'm a modal!!",
  });

  return (
    <>
      <GetInTouchButton type="button" onClick={toggle}>
        <ChatIcon />
        <ButtonText>Get In Touch</ButtonText>
      </GetInTouchButton>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal {...modalOptions}>
          <GetInTouchModalForm hide={toggle} />
        </Modal>
      </Suspense>
    </>
  );
};
