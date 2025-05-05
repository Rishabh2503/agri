import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  X,
  Sun,
  Cloud,
  Wind,
  Droplets,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
// Fix the import statement
import FarmingLoader2 from '../../components/loader/FarmingLoader2';
import logo from '../../img/logo.png';
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [weather, setWeather] = useState({ temp: 28, condition: 'sunny' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample preset questions in different languages
  const presetQuestions = {
    en: [
      'How to protect crops from pests?',
      'Best crops for this season?',
      'Current market prices for wheat'
    ],
    hi: [
      'फसलों को कीटों से कैसे बचाएं?',
      'इस मौसम के लिए सबसे अच्छी फसलें?',
      'गेहूं के वर्तमान बाजार मूल्य'
    ],
    ta: [
      'பயிர்களை பூச்சிகளிலிருந்து எவ்வாறு பாதுகாப்பது?',
      'இந்த பருவத்திற்கான சிறந்த பயிர்கள்?',
      'கோதுமைக்கான தற்போதைய சந்தை விலைகள்'
    ],
    te: [
      'పంటలను పురుగుల నుండి ఎలా రక్షించాలి?',
      'ఈ సీజన్‌కు ఉత్తమ పంటలు?',
      'గోధుమలకు ప్రస్తుత మార్కెట్ ధరలు'
    ],
    mr: [
      'पिकांना कीटकांपासून कसे संरक्षित करावे?',
      'या हंगामासाठी सर्वोत्तम पिके?',
      'गव्हाच्या सध्याच्या बाजारभावा'
    ]
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e, presetMsg = null) => {
    if (e) e.preventDefault();

    const msgToSend = presetMsg || message;
    if (!msgToSend.trim()) return;

    const userMessage = { user: 'You', message: msgToSend };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setShowSuggestions(false);
    setMessage('');

    try {
      const response = await fetch(
        'https://krishimart-back.onrender.com/api/v2/chatbot/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: msgToSend, language })
        }
      );

      const data = await response.json();

      setTimeout(() => {
        const botMessage = {
          user: 'Bot',
          message: data.aiResponse || "Sorry, I couldn't understand that."
        };
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 700); // Added slight delay for the typing effect
    } catch (error) {
      console.error('Error sending message:', error);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            user: 'Bot',
            message:
              'Sorry, there was an error processing your request. Please try again.'
          }
        ]);
        setLoading(false);
      }, 700);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setShowSuggestions(true);

    // Show a system message about language change
    const languageNames = {
      en: 'English',
      hi: 'Hindi',
      ta: 'Tamil',
      te: 'Telugu',
      mr: 'Marathi'
    };

    setMessages((prev) => [
      ...prev,
      {
        user: 'System',
        message: `Language changed to ${languageNames[newLanguage]}`
      }
    ]);
  };

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const WeatherWidget = () => (
    <div className='weather-widget'>
      {weather.condition === 'sunny' && (
        <Sun
          size={20}
          className='text-yellow-500'
        />
      )}
      {weather.condition === 'cloudy' && (
        <Cloud
          size={20}
          className='text-gray-400'
        />
      )}
      {weather.condition === 'rainy' && (
        <Droplets
          size={20}
          className='text-blue-500'
        />
      )}
      {weather.condition === 'windy' && (
        <Wind
          size={20}
          className='text-gray-500'
        />
      )}
      <span className='ml-1'>{weather.temp}°C</span>
    </div>
  );

  return (
    <div className='flex flex-col h-screen max-w-lg mx-auto bg-green-50 rounded-lg shadow-lg overflow-hidden'>
      {/* Header */}
      <div className='bg-green-600 p-4 flex items-center justify-between shadow-md'>
        <div className='flex items-center'>
          <img
            src={logo}
            alt='KrishiMart Logo'
            className='w-10 h-10 rounded-full mr-3'
          />
          <div>
            <h1 className='text-white font-bold text-lg'>
              KrishiMart Assistant
            </h1>
            <p className='text-green-100 text-xs'>Your farming companion</p>
          </div>
        </div>
        <div className='flex items-center'>
          <WeatherWidget />
          <select
            value={language}
            onChange={handleLanguageChange}
            className='ml-2 bg-green-700 text-white border border-green-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-300'
            tabIndex={1}>
            <option value='en'>English</option>
            <option value='hi'>हिंदी</option>
            <option value='ta'>தமிழ்</option>
            <option value='te'>తెలుగు</option>
            <option value='mr'>मराठी</option>
          </select>
        </div>
      </div>

      {/* Chat Messages */}
      <div className='flex-1 overflow-y-auto p-4 bg-green-50'>
        {messages.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full text-center p-4 animate-fade-in'>
            <MessageSquare
              size={60}
              className='text-green-500 mb-4'
            />
            <h2 className='text-xl font-semibold text-green-800 mb-2'>
              Welcome to KrishiMart Assistant
            </h2>
            <p className='text-green-700 mb-4'>
              Ask me anything about farming, crops, and agriculture!
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.user === 'You' ? 'justify-end' : 'justify-start'
            } ${
              msg.user === 'System' ? 'justify-center' : ''
            } animate-slide-in`}>
            {msg.user === 'System' ? (
              <div className='bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600'>
                {msg.message}
              </div>
            ) : (
              <div
                className={`px-4 py-3 rounded-lg max-w-xs lg:max-w-md ${
                  msg.user === 'You'
                    ? 'bg-green-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                {msg.message}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className='flex justify-start mb-4 animate-fade-in w-full h-64'>
            <FarmingLoader2 />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {showSuggestions && (
        <div className='p-2 bg-green-100 border-t border-green-200 animate-slide-up'>
          <p className='text-xs text-green-700 mb-2 font-medium'>
            Suggested Questions:
          </p>
          <div className='flex flex-wrap gap-2'>
            {presetQuestions[language].map((question, index) => (
              <button
                key={index}
                className='bg-white text-green-700 text-sm px-3 py-1 rounded-full border border-green-300 hover:bg-green-50 transition-colors'
                onClick={() => handleSendMessage(null, question)}
                tabIndex={index + 3}>
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className='p-3 bg-white border-t border-green-200'>
        <div className='flex items-center'>
          <input
            ref={inputRef}
            type='text'
            placeholder={
              language === 'en'
                ? 'Type your question...'
                : language === 'hi'
                ? 'अपना प्रश्न लिखें...'
                : language === 'ta'
                ? 'உங்கள் கேள்வியை தட்டச்சு செய்யவும்...'
                : language === 'te'
                ? 'మీ ప్రశ్నను టైప్ చేయండి...'
                : 'आपला प्रश्न टाइप करा...'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className='flex-1 p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300'
            tabIndex={2}
            disabled={loading}
          />
          <button
            onClick={(e) => handleSendMessage(e)}
            className={`bg-green-600 text-white p-3 rounded-r-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            tabIndex={3}
            aria-label='Send message'>
            {loading ? (
              <div className='flex space-x-1'>
                <div
                  className='w-2 h-2 bg-white rounded-full animate-bounce'
                  style={{ animationDelay: '0ms' }}></div>
                <div
                  className='w-2 h-2 bg-white rounded-full animate-bounce'
                  style={{ animationDelay: '300ms' }}></div>
                <div
                  className='w-2 h-2 bg-white rounded-full animate-bounce'
                  style={{ animationDelay: '600ms' }}></div>
              </div>
            ) : (
              <Send size={20} />
            )}
          </button>

          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className='ml-2 bg-gray-200 text-gray-600 p-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors'
              tabIndex={4}
              aria-label='Clear chat'>
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Help Button */}
      <button
        className='fixed bottom-24 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 animate-pulse-slow'
        onClick={() => setShowSuggestions(!showSuggestions)}
        tabIndex={5}
        aria-label='Help'>
        <HelpCircle size={24} />
      </button>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulseSlow {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Chat;
