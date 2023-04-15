import { ThemeProvider } from 'styled-components';
import { render, RenderOptions } from '@testing-library/react';
import { theme } from '../common/theme';

interface WrapperProps {
  children: React.ReactNode;
}

const TestWrapper: React.FC<WrapperProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };
