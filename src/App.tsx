import React from 'react';
import ReactDOM from 'react-dom/client';
import { KanbanProvider } from './provider/KanbanContext';
import Router from './router/Router';

import '@/assets/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KanbanProvider>
      <Router />
    </KanbanProvider>
  </React.StrictMode>
);
