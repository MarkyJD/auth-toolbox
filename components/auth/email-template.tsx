import { Button } from '../ui/button';

interface EmailTemplateProps {
  name: string;
  confirmLink: string;
}

const EmailTemplate = ({ name, confirmLink }: EmailTemplateProps) => {
  return (
    <div>
      <h1>Hi {name}</h1>
      <Button asChild>
        <a href={confirmLink}>Confirm your email</a>
      </Button>
    </div>
  );
};
export default EmailTemplate;
