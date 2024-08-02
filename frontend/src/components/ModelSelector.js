import React, { useEffect } from 'react';

function ModelSelector({ models, selectedModel, setSelectedModel }) {
  useEffect(() => {
    console.log('ModelSelector props - models:', models);
    console.log('ModelSelector props - selectedModel:', selectedModel);
    console.log('ModelSelector props - setSelectedModel:', setSelectedModel);
  }, [models, selectedModel, setSelectedModel]);

  return (
    <div className="model-selector">
      <label htmlFor="model-select">选择 AI 模型：</label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="">-- 请选择模型 --</option>
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;
