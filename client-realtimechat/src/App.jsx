import { ToastContainer } from 'react-toastify';
import { ChatBox } from './components/Chat/ChatBox';
import { JoinChatForm } from './components/User/JoinChatForm';
import { useChatClient } from './hooks/useChatClient';

function App() {
  const {
    isConnected,
    isUserJoined,
    messages,
    username,
    joinChat,
    sendMessage,
    leaveChat,
    setUsername,
  } = useChatClient();

  return (
    <>
      {!isConnected && <p>Conectando al servidor...</p>}
      {isConnected && !isUserJoined && (
        <JoinChatForm
          username={username}
          setUsername={setUsername}
          joinChat={joinChat}
        />
      )}
      {isUserJoined && (
        <ChatBox
          messages={messages}
          sendMessage={sendMessage}
          leaveChat={leaveChat}
          username={username}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
