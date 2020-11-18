/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './index.css';
import {LottieUser} from '../../animations/index'
export interface AvatarProps
  extends React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
  > {
  border?: string;
  Player?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  className = '',
  style,
  border,
  Player,
  ...props
}) => {
  if (!style) {
    style = {};
  }

  if (border) {
    style.borderColor = border;
  }

  return true ? (
    <div
      style={style}
      className={`avatar${className && ` ${className}`}`}
    >
      <LottieUser Player={Player}/>
    </div>

  ) : (
      <img
        {...props}
        style={style}
        className={`avatar${className && ` ${className}`}`}
      />
    );
};

export default Avatar;
