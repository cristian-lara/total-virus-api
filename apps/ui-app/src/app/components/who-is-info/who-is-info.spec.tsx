import { render } from '@testing-library/react';

import WhoIsInfo from './who-is-info';

describe('WhoIsInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhoIsInfo />);
    expect(baseElement).toBeTruthy();
  });
});
