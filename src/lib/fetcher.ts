import type { Word } from '../typings';

export default function fetcher(
  path: string,
  data: unknown = undefined
): Promise<Array<Word>> {
  return fetch(`${process.env.BASE_URL}/api/${path}`, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
