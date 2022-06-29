import { doc, DocumentData, getDocFromCache, getDocFromServer} from 'firebase/firestore';
import {db} from './firebase';

export type WordsAndHearts = {
  words: number;
  hearts: number;
}
export async function getUserWordsAndHearts(uid:string, refresh = false) {
  const userWordsRef = doc(db, 'user-words', uid);
  let wordsAndHearts: WordsAndHearts | DocumentData;
  try {
    if (refresh) {
      wordsAndHearts = await getDocFromServer(userWordsRef);
    } else {
      wordsAndHearts = await getDocFromCache(userWordsRef);
      console.log('FROM CACHE');
    }
  } catch (error) {
    console.error(error);
    console.log('FROM SERVER');
    wordsAndHearts = await getDocFromServer(userWordsRef);
  }
  return wordsAndHearts.data();
}

