import React from 'react';

function Message({ message }) {
  return (
    <div className={`message ${message.role}`}>
      <span className="role">{message.role === 'user' ? '用户' : 'Star'}:</span>
      <p>{message.content}</p>
    </div>
  );
}

export default Message;