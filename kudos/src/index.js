import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

export var database_prefix = "";
export var ml_prefix = "";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    database_prefix = "http://localhost:3001";
    ml_prefix = "http://localhost:5000";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
);