import * as React from 'react';
import { DisplayError } from '../../commons';

export default function CreateWordTextAreaSection({
  label,
  textValue,
  onFocus,
  onChange,
  error,
  id,
}: {
  label: string;
  textValue: string;
  onFocus: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error: string;
  id: string;
}) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="text-base text-black">
        {label}
      </label>
      <textarea
        id={id}
        rows={5}
        value={textValue}
        onFocus={onFocus}
        onChange={onChange}
        maxLength={3000}
        placeholder="xin mời nhập ví dụ ở ô này"
        required
        className="w-full px-3 bg-gray-200 py-2  resize-none placeholder-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-blue-100 focus:shadow focus:border-indigo-300"
      />

      {error ? (
        <div className="my-4">
          <DisplayError error={error} />
        </div>
      ) : null}
    </div>
  );
}
