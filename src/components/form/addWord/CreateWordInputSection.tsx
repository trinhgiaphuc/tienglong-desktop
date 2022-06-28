import * as React from 'react';
import { DisplayError } from '../../commons';

type PropsType = {
  label: string;
  value: string;
  onFocus?: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  required?: boolean;
  maxLength: number;
  error?: string;
  id: string;
  pattern?: string;
};

export default function CreateWordInputSection({
  id,
  label,
  error,
  ...rest
}: PropsType) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-base text-black">
        {label}
      </label>
      <input
        type="text"
        id={id}
        {...rest}
        className="w-full px-3 bg-gray-200 py-2 placeholder-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-blue-100 focus:shadow focus:border-indigo-300"
      />

      {error ? (
        <div className="my-4">
          <DisplayError error={error} />
        </div>
      ) : null}
    </div>
  );
}
