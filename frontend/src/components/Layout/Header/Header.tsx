import React from 'react';
import { ContraLogo } from '@/components/ContraLogo';

import { HeaderContainer, Navbar } from './Header.styles';

export function Header() {
  return (
    <HeaderContainer className="shadow-2xl shadow-cyan-100/20">
      <Navbar>
        <ContraLogo />
      </Navbar>
    </HeaderContainer>
  );
}
