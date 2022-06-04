import * as React from 'react';

type PropsType = {
  children: React.ReactNode;
};

export default function Template({ children }: PropsType) {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">{children}</div>
    </main>
  );
}
