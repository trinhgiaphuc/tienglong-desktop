import * as React from "react";
import { useUser } from "../lib/userContext";
import { ProfileCard, UserWordList } from "../components/profile";
import { Word } from "../typings";
import { WordsAndHearts } from "../lib/db";

export default function ProfilePage() {
  const { user } = useUser();
  const [userWords, setUserWords] = React.useState<Word[]>([]);
  if (!user) return null;

  React.useEffect(() => {
    window.electron.ipcRenderer.sendMessage("get-words-and-hearts-count", [{
      userId: user.id,
    }]);
    window.electron.ipcRenderer.sendMessage("get-user-words", [
      { userId: user.id },
    ]);

    window.electron.ipcRenderer.on('words-and-hearts', ({words, hearts}: WordsAndHearts) => {
      user.hearts = hearts;
      user.words = words;
    })
    const sub = window.electron.ipcRenderer.on(
      "user-words",
      (words: { userWords: Word[] }) => {
        setUserWords(words.userWords);
      },
    );
    return () => {
      sub();
    };
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-screen h-screen overflow-x-hidden overflow-y-scroll no-scrollbar lg:overflow-y-hidden select-none">
      <main className="lg:grid  grid-cols-2 flex flex-col gap-6 m-12 px-2">
        <ProfileCard userDetails={user} />
        <UserWordList userWords={userWords} image={user.image} />
      </main>
    </div>
  );
}
