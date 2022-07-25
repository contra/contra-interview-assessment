/* eslint-disable canonical/filename-match-exported */
import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import styled from 'styled-components';
import tw from 'twin.macro';

import { UserSidebar } from '@/containers/UserSidebar';
import { ProjectsBody } from '@/containers/ProjectsBody';
import { userData } from '@/data/projectsData';

const PageContainer = styled.div`
  ${tw`
    flex
    flex-1
    min-h-screen
    pt-16
    transition-all
    lg:pt-20
  `}
`;

const ContentContainer = styled.div`
  ${tw`
    flex-1
    w-full
    relative
  `}
`;

const SectionContainer = styled.section`
  ${tw`
    relative
    my-0
    mx-auto
    max-w-[1440px]
    lg:flex
    lg:flex-row
    lg:flex-nowrap
  `}
`;

const Index: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Projects created by {userData.name}</title>
        <meta
          property="og:title"
          content="Projects created by Douglas Eduardo"
          key="title"
        />
        <link
          href="https://builds.contra.com/92361a558/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
      </Head>

      <PageContainer>
        <ContentContainer>
          <SectionContainer>
            <UserSidebar />
            <ProjectsBody />
          </SectionContainer>
        </ContentContainer>
      </PageContainer>
    </React.Fragment>
  );
};

export default Index;
