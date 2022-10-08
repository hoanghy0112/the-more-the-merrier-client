import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import BasePage from './BasePage';

describe('UI Test', () => {
  test('should display content', async () => {
    render(
      <BasePage>
        <h4>Content</h4>
      </BasePage>,
    );

    expect(await screen.findAllByText('Content')).toBeDefined();
  });

  test('should show Information box', async () => {
    render(
      <BasePage>
        <h4>Content</h4>
      </BasePage>,
    );

    expect(await screen.findAllByText('Information box')).toBeDefined();
  });
});
