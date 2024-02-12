import { render } from '@testing-library/react';

import LastAnalisysStatsCard from './last-analisys-stats-card';

describe('LastAnalisysStatsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LastAnalisysStatsCard />);
    expect(baseElement).toBeTruthy();
  });
});
