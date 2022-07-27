import React from 'react';
import ContraIcon from '@/components/ContraIcon';

import { Container } from './LoadingScreen.styles';
import Head from 'next/head';

export function LoadingScreen() {
  return (
    <Container>
      <Head>
        <title>Contra - Work the Way You Want</title>
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

      <div className="flex flex-col justify-center items-center animate-pulse">
        <ContraIcon />
        <LoadingSVG />
      </div>
    </Container>
  );
}

const LoadingSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      className="ml-10"
      version="1.1"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <circle cx="6" cy="50" r="6" fill="#131313">
        <animateTransform
          attributeName="transform"
          begin="0.1"
          dur="1s"
          repeatCount="indefinite"
          type="translate"
          values="0 15 ; 0 -15; 0 15"
        ></animateTransform>
      </circle>
      <circle cx="30" cy="50" r="6" fill="#131313">
        <animateTransform
          attributeName="transform"
          begin="0.2"
          dur="1s"
          repeatCount="indefinite"
          type="translate"
          values="0 10 ; 0 -10; 0 10"
        ></animateTransform>
      </circle>
      <circle cx="54" cy="50" r="6" fill="#131313">
        <animateTransform
          attributeName="transform"
          begin="0.3"
          dur="1s"
          repeatCount="indefinite"
          type="translate"
          values="0 5 ; 0 -5; 0 5"
        ></animateTransform>
      </circle>
    </svg>
  );
};
