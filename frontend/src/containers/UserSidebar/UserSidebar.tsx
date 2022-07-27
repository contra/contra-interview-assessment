import Image from 'next/image';
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
} from '@/components/Icons';
import { GetInTouchModalForm } from '@/components/GetInTouchModalForm';
import {
  UserContainer,
  StickyContainer,
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
  AvatarContainer,
} from './UserSidebar.styles';
import { Button } from '@/components/Button';

interface UserSidebarProps {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    verifiedAccount: boolean;
    profileTitle?: string | null;
    imageUrl?: string | null;
    tags?: string[] | null;
    bio?: string | null;
    location?: string | null;
  };
}

export function UserSidebar({ user }: UserSidebarProps) {
  return (
    <UserContainer>
      <StickyContainer>
        <AvatarContainer>
          <Image
            className="rounded-full"
            src={user.imageUrl as string}
            width={208}
            height={208}
          />
        </AvatarContainer>
        <TextContainer>
          <FullName>
            {user.firstName} {user.lastName}
          </FullName>
          <BadgeContainer>
            {user.verifiedAccount ? <Badge /> : <BadgeUnchecked />}
          </BadgeContainer>
        </TextContainer>
        <ProfileTitleContainer>
          <ProfileTitle>{user.profileTitle}</ProfileTitle>
        </ProfileTitleContainer>
        <TextContainer>
          <BoxTagGroup>
            {user.tags?.map((tag) => (
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
          <BioText>{user.bio}</BioText>
        </TextContainer>
        <TextContainer>
          <LocationContainer>
            <LocationIcon />
            <TextLocation>{user.location}</TextLocation>
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
  const [modalOptions, toggle, toggleNestedModal] = useModal({
    animated: true,
    title: 'Want to Work with Douglas?',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    buttons: [
      <Button
        label="Get in Touch"
        onClickHandler={() => toggleNestedModal()}
      />,
      <Button label="Cancel" isCancel onClickHandler={() => toggle()} />,
    ],
  });

  return (
    <>
      <GetInTouchButton type="button" onClick={toggle}>
        <ChatIcon />
        <ButtonText>Get In Touch</ButtonText>
      </GetInTouchButton>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          {...modalOptions}
          nestedModal={<GetInTouchModalForm hide={toggleNestedModal} />}
        />
      </Suspense>
    </>
  );
};
