import { render } from '@testing-library/react';

import FileSearchSection from './file-search-section';

describe('SearchSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileSearchSection />);
    expect(baseElement).toBeTruthy();
  });
});
