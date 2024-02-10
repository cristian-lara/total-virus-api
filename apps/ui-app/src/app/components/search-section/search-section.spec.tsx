import { render } from '@testing-library/react';

import SearchSection from './search-section';

describe('SearchSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchSection />);
    expect(baseElement).toBeTruthy();
  });
});
