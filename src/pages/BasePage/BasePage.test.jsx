import React from 'react';

import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import BasePage from './BasePage';

describe('Accordion test', () => {
  test('should show title all the time', () => {
    render(
      <BasePage>
        <h4>Content</h4>
      </BasePage>,
    );

    expect(screen.getByText(/Content/i)).toBeDefined();
  });
});
