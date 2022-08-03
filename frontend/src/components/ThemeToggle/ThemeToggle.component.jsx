import { Fragment, useState } from 'react';

function switchTheme(e) {
  if (!document) return; // safer for server side rendering
  if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
  }
  else {
      document.documentElement.setAttribute('data-theme', 'light');
  }    
}

export default function ThemeToggle() {
  return (
    <Fragment>
      <input type="checkbox" onChange={switchTheme} /> Dark mode
    </Fragment>
  )
}
