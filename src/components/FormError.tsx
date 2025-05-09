
import { XCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-2 text-destructive text-sm mt-1">
      <XCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
