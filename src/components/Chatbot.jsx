import React, { useState } from 'react';
import './Chatbot.css';

// API Key and URL for Gemini API
const API_KEY = "AIzaSyBw7JdnhJf9WBlXpN0wkrgEY1qrEimFr7w";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = { text: inputMessage, sender: 'user' };

      // Update the messages state with the user's message immediately
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setLoading(true); // Indicate that the bot response is being fetched

      // API call to get chatbot response (Gemini API)
      const botMessage = await getBotResponse(inputMessage);

      // Update the messages state with the bot's response
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setLoading(false); // Hide the loading state once the response is received
      setInputMessage(''); // Clear input field
    }
  };

  const getBotResponse = async (message) => {
    try {
      console.log("Sending message:", message);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          max_output_tokens: 100,
        }),
      });

      console.log('API Response Status:', response.status);

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error fetching from Gemini API:', errorDetails);
        throw new Error('Error fetching bot response');
      }

      const data = await response.json();

      console.log('Gemini API Response:', data);

      if (data.generated_content) {
        return { text: data.generated_content, sender: 'bot' };
      } else {
        console.error('Unexpected response structure:', data);
        return { text: 'Sorry, I encountered an issue processing your request.', sender: 'bot' };
      }
    } catch (error) {
      console.error('Error occurred:', error);
      return { text: 'Sorry, I encountered an error while processing your request.', sender: 'bot' };
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>AI Codex Chatbot</h2>
      </div>
      <div className="chatbot-body">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          {loading && (
            <div className="message bot-message">
              <p>Typing...</p>
            </div>
          )}
        </div>
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          placeholder="Ask something..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={loading} // Disable the button when loading
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
