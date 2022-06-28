import * as React from 'react';

type SuggestTag = {
  id: string;
  title: string;
};

const suggestTag: {
  trend: SuggestTag[];
  source: SuggestTag[];
} = {
  trend: [
    { id: 'khongloithoi', title: 'Không lỗi thời' },
    { id: 'dangthinhhanh', title: 'Đang thịnh hành' },
    { id: 'khongphobien', title: 'Không còn phổ biến' },
  ],
  source: [
    { id: 'mienbac', title: 'Nguồn gốc từ phía Bắc' },
    { id: 'mientrung', title: 'Nguồn gốc từ miền Trung' },
    { id: 'miennam', title: 'Nguồn gốc từ phía Nam' },
  ],
};

export default function CreateWordSuggestTag({
  onChange,
  tagName,
  defaultId,
  name,
}: {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  tagName: 'source' | 'trend';
  defaultId: string;
  name: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          id={defaultId}
          name={name}
          type="radio"
          value=""
          onChange={onChange}
          defaultChecked={true}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label
          htmlFor={defaultId}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          Không
        </label>
      </div>
      {suggestTag[tagName].map(({ id, title }) => (
        <div key={id} className="flex items-center">
          <input
            id={id}
            name={name}
            type="radio"
            value={id}
            onChange={onChange}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label
            htmlFor={id}
            className="ml-3 block text-sm font-medium text-gray-700"
          >
            {title}
          </label>
        </div>
      ))}
    </div>
  );
}
