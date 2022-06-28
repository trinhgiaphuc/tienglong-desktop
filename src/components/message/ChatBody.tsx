import React from 'react';

const USER_IMAGE =
  'https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144';

const MES: { image: string; messages: string[] }[] = [
  {
    messages: ['Can be verified on any platform using docker'],
    image: USER_IMAGE,
  },
  {
    messages: [
      'Your error message says permission denied, npm global installs must be given root privileges.',
    ],
    image:
      'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144',
  },
  {
    messages: [
      "Command was run with root privileges. I'm sure about that.",
      "I've update the description so it's more obviously now",
      'FYI https://askubuntu.com/a/700266/510172',
      "Check the line above (it ends with a # so, I'm running it as root )# npm install -g @vue/devtools",
    ],
    image: USER_IMAGE,
  },
  {
    messages: [
      "Check the line above (it ends with a # so, I'm running it as root )# npm install -g @vue/devtools",
    ],
    image:
      'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144',
  },
  {
    messages: [
      "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks",
    ],
    image: USER_IMAGE,
  },
  {
    messages: [
      "Thanks for your message David. I thought I'm alone with this issue. Please, 👍 the issue to support it :)",
    ],
    image:
      'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144',
  },
  {
    messages: [
      'Are you using sudo?',
      'Run this command sudo chown -R `whoami` /Users/your_user_profile/.npm-global/ then install the package globally without using sudo',
    ],
    image: USER_IMAGE,
  },
  {
    messages: [
      'It seems like you are from Mac OS world. There is no /Users/ folder on linux 😄',
      'I have no issue with any other packages installed with root permission globally.',
    ],
    image:
      'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144',
  },
  {
    messages: [
      'yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem',
    ],
    image: USER_IMAGE,
  },
  {
    messages: [
      'I get the same error on Arch Linux (also with sudo)',
      'I also have this issue, Here is what I was doing until now: #1076',
      'even i am facing',
    ],
    image:
      'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144',
  },
];

export default function ChatBody() {
  React.useEffect(() => {
    document.getElementById('scroller').scrollIntoView({
      behavior: 'smooth',
      inline: 'end',
    });
  }, []);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto small-scrollbar relative"
    >
      {MES.map(({ image, messages }) =>
        image === USER_IMAGE ? (
          <UserMessage key={messages[0]} image={image} messages={messages} />
        ) : (
          <OtherMessage key={messages[0]} image={image} messages={messages} />
        )
      )}
      <span id="scroller" className="absolute bottom-0" />
    </div>
  );
}

function OtherMessage({
  image,
  messages,
}: {
  image: string;
  messages: string[];
}) {
  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-base max-w-md mx-2 order-2 items-start">
          {messages.map((mess) => (
            <div key={mess}>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-yellow-300 text-gray-900">
                {mess}
              </span>
            </div>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full order-1 overflow-hidden flex items-center justify-center">
          <img src={image} alt="other admin profile picture" />
        </div>
      </div>
    </div>
  );
}

function UserMessage({
  image,
  messages,
}: {
  image: string;
  messages: string[];
}) {
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-base max-w-md mx-2 order-1 items-end">
          {messages.map((message) => (
            <div key={message}>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-green-800 text-white ">
                {message}
              </span>
            </div>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full order-1 overflow-hidden flex items-center justify-center">
          <img src={image} alt="My profile piture" />
        </div>
      </div>
    </div>
  );
}
