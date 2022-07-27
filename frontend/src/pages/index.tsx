/* eslint-disable canonical/filename-match-exported */
import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import styled from 'styled-components';
import tw from 'twin.macro';

import { UserSidebar } from '@/containers/UserSidebar';
import { ProjectsBody } from '@/containers/ProjectsBody';
import { useGetUserQuery } from '@/lib/client/graphql/generated';
import { LoadingScreen } from '@/components/Loading';

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
  const { data, loading } = useGetUserQuery({
    variables: {
      userId: '4f056d52-eb7e-4a05-b962-3ef4c1804d66',
    },
  });

  if (loading) return <LoadingScreen />;
  if (!data) return <h1>Error loading data...</h1>;
  const { getUser: user } = data;

  return (
    <React.Fragment>
      <Head>
        <title>Projects created by Douglas Eduardo</title>
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
            <UserSidebar user={user} />
            <ProjectsBody user={user} />
          </SectionContainer>
        </ContentContainer>
      </PageContainer>
    </React.Fragment>
  );
};

export default Index;
