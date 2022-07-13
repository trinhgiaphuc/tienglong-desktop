export type Word = {
  definition: string;
  tags: string[];
  authorId: string;
  createdAt: number;
  example: string;
  word: string;
  createdYear: string;
  author: string;
  trend: string | null;
  updatedAt: number;
  approvedAt: number;
  id: string;
  heartCount: number;
  status: string;
  source: string | null;
};

export type TodayWords = {
  todayWords: Word[];
};

export type TrendingWords = {
  trendingWords: Word[];
};

export type LoginData = [{ email: string; password: string }];

export type StatusType = 'loading' | 'authenticated' | 'unauthenticated';

export type UserDetails = {
  createdAt: { _seconds: number; _nanoseconds: number };
  email: string;
  hashedPass: string;
  id: string;
  image: string;
  role: string[];
  updatedAt: { _seconds: number; _nanoseconds: number };
  username: string;
  words?: number,
  hearts?: number
};

export type RequestChannels =
  | 'get-today-words'
  | 'get-trending-words'
  | 'get-userDetails'
  | 'get-user-words'
  | 'get-words-and-hearts-count'
  | 'login'
  | 'logout'
  | 'set-auth'
  | 'create-word'
  | 'add-heart'
  | 'remove-heart'
  | 'login-admin'
  | 'approve-word'
  | 'delete-word'
  | 'send-chat-admin'

export type ResponseChannels = 'today-words' | 'trending-words' | 'login-status' | 'user-data' | 'user-words' | 'clear-caches' | 'words-and-hearts';

export type WordsAndHearts = {
  words: number;
  hearts: number;
}  
