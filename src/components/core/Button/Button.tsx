import React from 'react';
import './button.css';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  float?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  float = false,
  ...props
}) => {
  className = `btn${className && ` ${className}`}`;

  if (float) {
    className += ' btn:float';
  }

  return <div {...props} className={className} />;
};

export default Button;
