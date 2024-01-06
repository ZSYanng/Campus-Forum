import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>

);

window.onbeforeunload = () => {
  localStorage.clear();
}
