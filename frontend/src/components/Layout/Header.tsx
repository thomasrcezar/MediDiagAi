import React from 'react';

interface HeaderProps {
  title?: string;
  logo?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'MediDiagAi',
  logo,
}) => {
  return (
    <header className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {logo && <div>{logo}</div>}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>
    </header>
  );
};