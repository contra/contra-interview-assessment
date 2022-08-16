/* eslint-disable func-style */

import Link from 'next/link';

type navItem = {
  name: string;
  path: string;
};

export type NavigationProps = {
  navLinks: navItem[];
};

const Navigation = ({ navLinks }: NavigationProps) => {
  return (
    <nav className="nav">
      {navLinks.map((link: navItem) => (
        <Link href={link.path} key={link.name + 1}>
          <a
            style={{
              color: 'black',
              fontSize: 20,
              textDecoration: 'none',
            }}
          >
            {link.name}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export { Navigation };
