import { CardWrapper } from './card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center">
        <ExclamationTriangleIcon className="text-destructive w-4 h-4" />
      </div>
    </CardWrapper>
  );
};
export default ErrorCard;
