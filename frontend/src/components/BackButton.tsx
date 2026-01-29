import { useNavigate } from 'react-router-dom';

type Props = {
  label?: string;
  fallbackTo?: string;
  className?: string;
};

export default function BackButton({ label = 'Back', fallbackTo = '/', className = '' }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackTo);
    }
  };

  return (
    <button type="button" className={className} onClick={handleBack}>
      {label}
    </button>
  );
}
