import { render } from '@testing-library/react';

import CardAnalisysDetails from './card-analisys-details';

describe('CardAnalisysDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardAnalisysDetails />);
    expect(baseElement).toBeTruthy();
  });
});
