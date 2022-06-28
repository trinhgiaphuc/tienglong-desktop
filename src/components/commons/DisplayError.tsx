import * as React from 'react';

export default function DisplayError({ error }: { error: string }) {
  return (
    <h1 className="rounded-md text-center border border-black bg-red-500 text-base bg-opacity-80 p-2">
      {error}
    </h1>
  );
}
