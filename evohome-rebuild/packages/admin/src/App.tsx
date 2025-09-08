import React from 'react';

export default function App() {
  return (
    <div style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Arial', padding: 24}}>
      <h1>✅ EvoHome Admin (Vite build)</h1>
      <p>This is the minimal admin UI. The CI will publish this to <code>/admin</code>.</p>
      <ul>
        <li><a href="/health">/health</a></li>
        <li><a href="/docs">/docs</a></li>
      </ul>
      <p style={{opacity: .7}}>Next step: replace this with your full Admin app components.</p>
    </div>
  );
}
