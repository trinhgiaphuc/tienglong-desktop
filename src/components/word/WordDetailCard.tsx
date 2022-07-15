import React from 'react'
import type { Word } from '../../typings'
import Reaction from '../buttons/Reaction';
import { Loading } from '../commons'

export default function WordDetailCard({ word }: { word: Word }) {
  if (!word) {
    return <Loading />
  }
  return (
    <div className="w-3/4 p-6 border border-gray-100 rounded-xl bg-gray-50 text-center sm:p-8">
      <div className="h-full flex flex-col justify-center text-4xl gap-6">
        {word.word}
        <p className="text-gray-600 mb-4 md:text-xl">{word.definition}</p>
        <p className="text-gray-600 md:text-xl">{word.example}</p>
        <div>
          <h6 className="text-lg font-semibold leading-none mb-6">{word.author}</h6>
          <div className="flex gap-3">
            {word.tags.map(t => <span key={t} className="text-base text-gray-500">{t}</span>)}
          </div>
        </div>

        <div className='h-[2px] mx-auto w-1/2 bg-zinc-300 my-5' />

        <Reaction authorId={word.authorId} wordId={word.id} />
      </div>
      <p className="text-md text-left ml-6 font-medium">{word.heartCount} hearts</p>
    </div>
  )
}
