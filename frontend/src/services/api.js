const API_URL = process.env.REACT_APP_API_URL;

async function fetchWithLogging(url, options = {}) {
  console.log(`Fetching from: ${url}`);
  console.log('Fetch options:', options);

  try {
    const response = await fetch(url, options);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    const text = await response.text();
    console.log('Response text:', text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Invalid JSON in response');
    }

    console.log('Parsed data:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

export async function getModels() {
  console.log('getModels called');
  return fetchWithLogging(`${API_URL}/models`);
}

export async function getModes() {
  console.log('getModes called');
  return fetchWithLogging(`${API_URL}/modes`);
}

export async function sendMessage(model, mode, message, hint) {
  console.log('sendMessage called with:', { model, mode, message, hint });
  return fetchWithLogging(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, mode, message, hint }),
  });
}

// 添加一个用于测试 API 连接的函数
export async function testApiConnection() {
  console.log('Testing API connection');
  try {
    const response = await fetch(`${API_URL}/test`);
    console.log('Test response status:', response.status);
    const text = await response.text();
    console.log('Test response text:', text);
    return text;
  } catch (error) {
    console.error('Error testing API connection:', error);
    throw error;
  }
}

// 打印 API_URL 以确保环境变量被正确加载
console.log('API_URL:', API_URL);