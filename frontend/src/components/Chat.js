import React, { useState } from 'react';
import Message from './Message';
import HintInput from './HintInput';
import { sendMessage } from '../services/api';

function Chat({ model, mode }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [hint, setHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(model, mode, inputMessage, hint);
      let messageContent;
      if (model === 'llama3.1:8b') {
        // Assuming response contains a "response" field in this case
        messageContent = response.response; // Extract the content for llama3.1:8b
      } else {
        // For other models, use the "message" field
        messageContent = response.message;
}
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: messageContent }
      ]);
    } catch (error) {
      console.error('发送消息时出错:', error);
      setError('发送消息失败，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat">
      <div className="message-list">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && <div className="loading">AI正在思考中...</div>}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="input-area">
        <HintInput hint={hint} setHint={setHint} />
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入你的消息..."
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          发送
        </button>
      </div>
    </div>
  );
}

export default Chat;