/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './index.css';

export interface AvatarProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  border?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  className = '',
  style,
  border,
  ...props
}) => {
  if (!style) {
    style = {};
  }

  if (border) {
    style.borderColor = border;
  }

  return (
    <img
      {...props}
      style={style}
      className={`avatar${className && ` ${className}`}`}
    />
  );
};

export default Avatar;
