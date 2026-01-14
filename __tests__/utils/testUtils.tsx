import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Mock NextIntlClientProvider for tests
function TestProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: TestProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
