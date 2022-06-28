import * as React from 'react';
import { ChatHead, ChatBody, SendMessageSection } from '../components/message';

export default function AdminPage() {
  return (
    <div className="p:2 sm:p-6 justify-between flex flex-col h-screen w-screen select-none">
      <ChatHead />
      <ChatBody />
      <SendMessageSection />
    </div>
  );
}
