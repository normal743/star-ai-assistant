import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import ModeSelector from './components/ModeSelector';
import ModelSelector from './components/ModelSelector';
import { getModels, getModes, testApiConnection } from './services/api';
import './styles/App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [models, setModels] = useState([]);
  const [modes, setModes] = useState([]);
  const [apiStatus, setApiStatus] = useState('未测试');

  useEffect(() => {
    async function fetchData() {
      try {
        // 测试 API 连接
        const testResult = await testApiConnection();
        setApiStatus(`API 连接测试成功: ${testResult}`);
        console.log('API connection test result:', testResult);

        // 获取模型和模式
        const fetchedModels = await getModels();
        const fetchedModes = await getModes();
        
        console.log('Fetched models:', fetchedModels);
        console.log('Fetched modes:', fetchedModes);
        
        setModels(fetchedModels);
        setModes(fetchedModes);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiStatus(`API 连接错误: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star AI Assistant</h1>
        <p>API 状态: {apiStatus}</p>
      </header>
      <main>
        <ModelSelector 
          models={models} 
          selectedModel={selectedModel} 
          setSelectedModel={setSelectedModel} 
        />
        <ModeSelector 
          modes={modes} 
          selectedMode={selectedMode} 
          setSelectedMode={setSelectedMode} 
        />
        {selectedModel && selectedMode && (
          <Chat 
            model={selectedModel} 
            mode={selectedMode} 
          />
        )}
      </main>
    </div>
  );
}

export default App;