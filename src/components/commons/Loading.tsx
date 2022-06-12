import * as React from 'react';
import loading from '../../assets/icons/loading.svg';

export default function Loading() {
  return (
    <img className="flex-grow scale-[3.5]" src={loading} alt="loading..." />
  );
}
