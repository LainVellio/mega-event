import { Link } from 'react-router-dom';
import stylesButton from './Button.module.css';

interface ButtonLinkProps extends React.HTMLAttributes<HTMLLinkElement> {
  to: string;
}

const ButtonLink = ({ to, className, children }: ButtonLinkProps) => {
  return (
    <Link to={to} className={`${stylesButton.button} ${className}`}>
      {children}
    </Link>
  );
};

export default ButtonLink;
