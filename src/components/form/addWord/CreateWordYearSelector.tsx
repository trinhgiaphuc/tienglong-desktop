import * as React from 'react';

export default function CreateWordYearSelector({
  onChange,
}: {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}) {
  const thisYear = new Date().getFullYear();
  const years = new Array(thisYear - 1999).fill('*').map((_, i) => i + 2000);

  return (
    <div className="mb-2 inline-block relative">
      <select
        className="bg-gray-300 text-gray-700 focus:outline focus:outline-blue-100 font-semibold py-2 px-4 rounded items-center no-scrollbar"
        onChange={onChange}
      >
        <option value={thisYear} defaultChecked>
          Năm
        </option>
        <option value="DiSản">Di Sản</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
