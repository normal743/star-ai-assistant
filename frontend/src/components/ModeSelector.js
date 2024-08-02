import React, { useEffect } from 'react';

function ModeSelector({ modes, selectedMode, setSelectedMode }) {
  useEffect(() => {
    console.log('ModeSelector props - modes:', modes);
    console.log('ModeSelector props - selectedMode:', selectedMode);
    console.log('ModeSelector props - setSelectedMode:', setSelectedMode);
  }, [modes, selectedMode, setSelectedMode]);
  
  return (
    <div className="mode-selector">
      <label htmlFor="mode-select">选择模式：</label>
      <select
        id="mode-select"
        value={selectedMode}
        onChange={(e) => setSelectedMode(e.target.value)}
      >
        <option value="">-- 请选择模式 --</option>
        {modes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModeSelector;