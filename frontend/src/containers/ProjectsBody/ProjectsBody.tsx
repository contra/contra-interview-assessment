import React, { Suspense } from 'react';

import { useModal } from '@/hooks/useModal';
const Modal = React.lazy(() => import('@/hooks/useModal'));
import { CreateProjectForm } from '@/components/CreateProjectModalForm';
import { CardDeleteProject } from '@/components/DeleteProject';
import { useGetProjectsByUserIdQuery } from '@/lib/client/graphql/generated';
import {
  Card,
  CardDetails,
  CardDetailsDescription,
  CardDetailsTitle,
  CardImage,
  ProfileTitle,
  ProjectCards,
  ProjectsContainer,
  ProfileTitleContainer,
  ProjectCardsContainer,
  CreateProjectTitle,
  CreateProjectButton,
  CardButtonWrapper,
  CreateProjectContainer,
  CardDetailsCreate,
} from './ProjectsBody.styles';
import { LoadingScreen } from '../../components/Loading';
import { ProjectIcon } from '@/components/Icons';

interface ProjectsBodyProps {
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

export function ProjectsBody({ user }: ProjectsBodyProps) {
  const { data, loading } = useGetProjectsByUserIdQuery({
    variables: {
      userId: '4f056d52-eb7e-4a05-b962-3ef4c1804d66',
    },
  });

  if (loading) return <LoadingScreen />;
  if (!data) return <h1>Error loading data...</h1>;
  const { getProjectsByUserId: userProjects } = data;

  return (
    <ProjectsContainer>
      <ProfileTitleContainer>
        <ProfileTitle>{user.profileTitle}</ProfileTitle>
      </ProfileTitleContainer>
      <ProjectCardsContainer>
        <ProjectCards>
          <CreateProjectCard />
          {userProjects.map((project) => {
            return (
              <Card key={project.projectId}>
                <CardDeleteProject projectId={project.projectId} />
                <CardImage src={project.imageUrl} />
                <CardDetails>
                  <CardDetailsTitle>{project.title}</CardDetailsTitle>
                  <CardDetailsDescription>
                    {project.description}
                  </CardDetailsDescription>
                </CardDetails>
              </Card>
            );
          })}
        </ProjectCards>
      </ProjectCardsContainer>
    </ProjectsContainer>
  );
}

const CreateProjectCard = () => {
  const [modalOptions, toggle] = useModal({
    animated: true,
    closeButton: true,
    icon: <ProjectIcon />,
  });

  return (
    <>
      <CreateProjectContainer>
        <CardButtonWrapper onClick={toggle}>
          <CreateProjectButton>
            <p>+</p>
          </CreateProjectButton>
        </CardButtonWrapper>
        <CardDetailsCreate>
          <CreateProjectTitle>Create a Project</CreateProjectTitle>
          <CardDetailsDescription>
            Projects highlight your best skills and experience. ⭐️
          </CardDetailsDescription>
          <CardDetailsDescription>
            Need project inspiration?
          </CardDetailsDescription>
        </CardDetailsCreate>
      </CreateProjectContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal {...modalOptions}>
          <CreateProjectForm hide={toggle} />
        </Modal>
      </Suspense>
    </>
  );
};
