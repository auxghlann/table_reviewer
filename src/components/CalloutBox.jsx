import React from 'react';

export default function CalloutBox({ type = 'info', children }) {
  const styles = {
    info: 'bg-blue-100 border-blue-500 text-blue-900',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-900',
    success: 'bg-green-100 border-green-500 text-green-900',
    error: 'bg-red-100 border-red-500 text-red-900',
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  };

  return (
    <div className={`my-4 p-4 border-l-4 ${styles[type]} font-medium`}>
      <span className="mr-2 text-xl">{icons[type]}</span>
      {children}
    </div>
  );
}
