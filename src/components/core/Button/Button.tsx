import React from 'react';
import './button.css';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  small?: boolean;
  large?: boolean;
  float?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  small: isSmall = false,
  large: isLarge = false,
  float: isFloat = false,
  ...props
}) => {
  className = `btn${className && ` ${className}`}`;

  if (isFloat) {
    className += ' btn:float';
  }

  if (isSmall) {
    className += ' btn:small';
  }

  if (isLarge) {
    className += ' btn:large';
  }

  return <div {...props} className={className} />;
};

export default Button;
