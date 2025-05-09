
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorFallback from '../components/ErrorFallback';

describe('ErrorFallback', () => {
  it('renders error message', () => {
    const testError = new Error('Test error message');
    render(<ErrorFallback error={testError} />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when button is clicked', async () => {
    const resetMock = vi.fn();
    const testError = new Error('Test error message');
    
    render(<ErrorFallback error={testError} resetErrorBoundary={resetMock} />);
    
    const button = screen.getByRole('button', { name: /try again/i });
    await userEvent.click(button);
    
    expect(resetMock).toHaveBeenCalledTimes(1);
  });

  it('does not show reset button when showReset is false', () => {
    const resetMock = vi.fn();
    const testError = new Error('Test error message');
    
    render(<ErrorFallback 
      error={testError} 
      resetErrorBoundary={resetMock} 
      showReset={false} 
    />);
    
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });
});
