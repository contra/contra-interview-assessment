import React from 'react';
import {
  Card,
  CardDetails,
  CardDetailsAvatar,
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

import { userData } from '@/data/projectsData';

export function ProjectsBody() {
  return (
    <ProjectsContainer>
      <ProfileTitleContainer>
        <ProfileTitle>FullStack Developer</ProfileTitle>
      </ProfileTitleContainer>
      <ProjectCardsContainer>
        <ProjectCards>
          <CreateProjectContainer>
            <CardButtonWrapper>
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
          {userData.projects.map((project) => {
            return (
              <Card key={project.id}>
                <CardImage src={project.image} />
                <CardDetails>
                  <CardDetailsTitle>{project.title}</CardDetailsTitle>
                  {project.description ? (
                    <CardDetailsDescription>
                      {project.description}
                    </CardDetailsDescription>
                  ) : (
                    <CardDetailsAvatar src="https://avatars.githubusercontent.com/u/19417957?v=4" />
                  )}
                </CardDetails>
              </Card>
            );
          })}
        </ProjectCards>
      </ProjectCardsContainer>
    </ProjectsContainer>
  );
}
