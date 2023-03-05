import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

test('primary button display exactly title', () => {
  const buttonTitle = 'fadsfasdf';
  render(<PrimaryButton title={buttonTitle} />);
  const button = screen.getByRole('button', { name: buttonTitle });
  expect(button).toHaveTextContent(buttonTitle);
});

test('primary button has default text', () => {});
