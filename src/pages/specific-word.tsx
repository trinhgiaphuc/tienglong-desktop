import React from 'react'
import { useParams } from 'react-router-dom'
import type { Word } from '../typings';
import WordDetailCard from '../components/word/WordDetailCard'

export default function SpecificWordPage() {
  const { wordId } = useParams();
  const [word, setWord] = React.useState<Word>(null);

  React.useEffect(() => {
    window.electron.ipcRenderer.sendMessage('fetch-word', [wordId]);
    window.electron.ipcRenderer.on('get-word', ( wordDetails: Word ) => {
      setWord(wordDetails);
    });
  }, []);

  return (
    <div className="py-16 white mx-auto">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <h2 className="mb-12 text-center text-2xl text-white font-bold md:text-4xl">Nghĩa của từ</h2>
        <div className="gap-8 flex flex-col items-center justify-center">
          <WordDetailCard word={word} />

          {/* <div className='h-[2px] w-1/2 bg-white my-5' />*/}
          {/* TODO: Similar words*/}
        </div>
      </div>
    </div>)
}
