import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render(url) {
  return renderToString(
    <App RouterComponent={StaticRouter} routerProps={{ location: url }} />,
  );
}
