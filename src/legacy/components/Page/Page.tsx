import React from 'react';
import './page.scss';

export interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
}

const Page = ({ title, children, className = '', ...props }: Props) => {
  className = `page${className && ` ${className}`}`;
  document.title = title;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Page;
