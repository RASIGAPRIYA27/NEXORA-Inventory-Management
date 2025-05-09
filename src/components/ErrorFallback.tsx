
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
  showReset?: boolean;
}

const ErrorFallback = ({ 
  error, 
  resetErrorBoundary, 
  showReset = true 
}: ErrorFallbackProps) => {
  useEffect(() => {
    console.error('Error caught by ErrorFallback:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive mx-auto my-8 max-w-md">
      <AlertTriangle className="h-10 w-10 mb-4" />
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm mb-4 text-center">{error.message || 'An unexpected error occurred'}</p>
      {showReset && resetErrorBoundary && (
        <Button 
          variant="outline" 
          className="border-destructive text-destructive hover:bg-destructive/10"
          onClick={resetErrorBoundary}
        >
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorFallback;
