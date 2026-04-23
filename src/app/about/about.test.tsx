import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers';
import AboutPage, { metadata } from './page';

expect.extend(axeMatchers);

describe('About Page', () => {
  test('renders the correct H1 heading', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /about me/i });
    expect(heading).toBeInTheDocument();
  });

  test('contains valid SEO metadata', () => {
    expect(metadata.title).toBe('About | Gal Aqua');

    const description = metadata.description || '';
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(160);
  });
});

describe('About Page Accessibility', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
