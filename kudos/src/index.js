import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

export var prefix = "";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    prefix = "http://localhost:3001";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
);