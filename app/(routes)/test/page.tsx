'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom/client';

const quotes = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  'Life is what happens when you’re busy making other plans. - John Lennon',
  'The best time to plant a tree was twenty years ago. The second best time is now. - Chinese Proverb',
  'Your time is limited, don’t waste it living someone else’s life. - Steve Jobs',
  'You only live once, but if you do it right, once is enough. - Mae West'
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function App() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const changeBackgroundAndQuote = () => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      setBgImage(`https://image.pollinations.ai/prompt/motivational%20background%20${randomNumber}?nologo=true&model=flux-turbo&seed=${randomNumber}`);
      setQuote(getRandomQuote());
      console.log(quote);
      
    };
    changeBackgroundAndQuote();
    const interval = setInterval(changeBackgroundAndQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} suppressHydrationWarning>
      <div className="text-center p-8 rounded-lg shadow-lg bg-white opacity-90 transition-opacity duration-700">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Motivational Quote</h1>
        <Image lazyBoundary='500px' height={500} width={500} src={`https://image.pollinations.ai/prompt/motivational%20background`} alt="" />
        {/* <p className="text-xl text-gray-600 mb-4">{quote}</p> */}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" onClick={() => { setBgImage(`https://image.pollinations.ai/prompt/motivational%20background%20${Math.floor(Math.random() * 100) + 1}?nologo=true&model=flux-turbo&seed=${Math.floor(Math.random() * 100) + 1}`); setQuote(getRandomQuote()); }}>New Quote</button>
      </div>
    </div>
  );
}