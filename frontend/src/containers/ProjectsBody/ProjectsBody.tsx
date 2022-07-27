import React, { Suspense } from 'react';

import { useModal } from '@/hooks/useModal';
const Modal = React.lazy(() => import('@/hooks/useModal'));
import { CreateProjectForm } from '@/components/CreateProjectModalForm';
import { DeleteProjectModal } from '@/components/DeleteProject';
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
  CardDeleteButton,
  CardDeleteButtonContainer,
} from './ProjectsBody.styles';
import { LoadingScreen } from '../../components/Loading';

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
                <CardDelete projectId={project.projectId} />
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

const CardDelete = ({ projectId }: { projectId: string }) => {
  const [modalOptions, toggle] = useModal({
    animated: true,
  });

  return (
    <>
      <CardDeleteButtonContainer onClick={toggle}>
        <CardDeleteButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </CardDeleteButton>
      </CardDeleteButtonContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal {...modalOptions}>
          <DeleteProjectModal hide={toggle} projectId={projectId} />
        </Modal>
      </Suspense>
    </>
  );
};
