import React from 'react';
import Image from 'next/image';
import ProjectImg from '@/assets/icon-project-96.png';

export function ProjectIcon() {
  return <Image src={ProjectImg} width={72} height={72} />;
}
