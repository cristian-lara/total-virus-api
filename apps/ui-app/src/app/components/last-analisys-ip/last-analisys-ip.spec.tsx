import { render } from '@testing-library/react';

import LastAnalisysIp from './last-analisys-ip';

describe('LastAnalisysIp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LastAnalisysIp />);
    expect(baseElement).toBeTruthy();
  });
});
