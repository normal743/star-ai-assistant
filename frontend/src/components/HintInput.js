import React from 'react';

function HintInput({ hint, setHint }) {
  return (
    <div className="hint-input">
      <input
        type="text"
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        placeholder="输入提示（可选）..."
      />
    </div>
  );
}

export default HintInput;