import { render } from '@testing-library/react';

import FileCard from './file-card';

describe('FileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileCard />);
    expect(baseElement).toBeTruthy();
  });
});
