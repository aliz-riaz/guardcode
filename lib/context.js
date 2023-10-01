import { createContext, useState } from "react";

export const ChatContext = createContext({
  channelList: null,
  setChannelList: () => null,
  messageList: null,
  setMessageList: () => null,
});

export const ChatProvider = ({ children }) => {
  const [channelList, setChannelList] = useState(null);
  const [messageList, setMessageList] = useState(null);
  const value = {
    channelList,
    setChannelList,
    messageList,
    setMessageList,
  };

  return (
    <ChatProvider.Provider value={value}>{children}</ChatProvider.Provider>
  );
};
