// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react'; // Chakra UI Box component for layout
import Home from './components/Home'; // Import the Home component
import WebEditor from './components/WebEditor'; // Import the WebEditor component
import Chatbot from './components/Chatbot'; // Import the Chatbot component
import CodeEditor from './components/CodeEditor'; // Import the CodeEditor component

function App() {
  return (
    <Router>
      <Box minH="100vh" bg="#0f0a19" color="gray.500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/web-editor" element={<WebEditor />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/code-editor" element={<CodeEditor />} /> {/* Route for CodeEditor */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
