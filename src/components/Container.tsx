import React, { ReactNode } from 'react';

interface ContainerProps {
  readonly children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      {children}
    </div>
  );
}