import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { getHomepageText } from '@study/pagetext';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
   const text = getHomepageText()
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(
      getByText(text.title.text)
    ).toBeTruthy();
  });
});
