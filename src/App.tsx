import React from 'react';
import * as Components from './components';

export const App: React.FC = () => {
  return (
    <div className="app">
      {Object.entries(Components).map(([name, Component]) => (
        <Component key={name} />
      ))}
    </div>
  );
}; 