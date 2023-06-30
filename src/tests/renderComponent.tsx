import { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { Providers } from 'providers/providers';

const renderComponent = (component: ReactNode) => {
  return render(<Providers>{component}</Providers>);
};

export default renderComponent;
