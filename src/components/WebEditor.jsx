import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './WebEditor.css';

const WebEditor = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [srcDoc, setSrcDoc] = useState('');

  // Effect to update the iframe content
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  // Function to change tab without adding to history
  const handleTabChange = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      window.history.replaceState(null, '', `#${tab}`); // Replacing state instead of pushing
    }
  };

  const handleEditorChange = (value, language) => {
    if (language === 'html') setHtml(value);
    if (language === 'css') setCss(value);
    if (language === 'javascript') setJs(value);
  };

  return (
    <div className="web-editor">
      <div className="editor-pane">
        <div className="tabs">
          <button onClick={() => handleTabChange('html')} className={activeTab === 'html' ? 'active' : ''}>
            HTML
          </button>
          <button onClick={() => handleTabChange('css')} className={activeTab === 'css' ? 'active' : ''}>
            CSS
          </button>
          <button onClick={() => handleTabChange('js')} className={activeTab === 'js' ? 'active' : ''}>
            JavaScript
          </button>
        </div>
        <div className="editors">
          {activeTab === 'html' && (
            <MonacoEditor
              height="calc(100vh - 150px)"
              language="html"
              value={html}
              onChange={(value) => handleEditorChange(value, 'html')}
              theme="vs-dark"
            />
          )}
          {activeTab === 'css' && (
            <MonacoEditor
              height="calc(100vh - 150px)"
              language="css"
              value={css}
              onChange={(value) => handleEditorChange(value, 'css')}
              theme="vs-dark"
            />
          )}
          {activeTab === 'js' && (
            <MonacoEditor
              height="calc(100vh - 150px)"
              language="javascript"
              value={js}
              onChange={(value) => handleEditorChange(value, 'javascript')}
              theme="vs-dark"
            />
          )}
        </div>
      </div>
      <div className="output-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default WebEditor;
