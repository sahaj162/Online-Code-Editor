 import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for the home page

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="title">AI Codex</div>
        <div className="nav-links">
          <a onClick={() => navigate('/home')}>Home</a>
          <a onClick={() => navigate('/web-editor')}>Web Editor</a>
          <a onClick={() => navigate('/code-editor')}>Compiler</a> {/* Updated route */}
          <a onClick={() => navigate('/chatbot')}>Chatbot</a>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h2>Welcome to AI Codex</h2>
      </section>

      {/* Feature Boxes */}
      <div className="home-main">
        <div className="feature-box" onClick={() => navigate('/web-editor')}>
          <h3>Real-time Syntax Highlighting</h3>
          <p>Write HTML, CSS, and JS code with live syntax highlighting.</p>
        </div>
        <div className="feature-box" onClick={() => navigate('/code-editor')}>
          <h3>Code Compiler</h3>
          <p>Run Python, JS, TS, PHP, and other languages with ease.</p>
        </div>
        <div className="feature-box" onClick={() => navigate('/chatbot')}>
          <h3>AI-powered Chatbot</h3>
          <p>Get assistance and answers for your coding doubts.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;