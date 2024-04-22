import { FunctionComponent, ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface IButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'submit' | 'cancel' | 'add';
  children: ReactNode;
}

const Button: FunctionComponent<IButtonProps> = ({ onClick, disabled, variant, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.btn, {
        [styles.btn__submit]: variant === 'submit',
        [styles.btn__cancel]: variant === 'cancel',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
