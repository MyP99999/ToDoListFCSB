'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TypeWriterContainer = styled.div`
  font-size: 1.8em;
  letter-spacing: 2px;
  font-family: monospace;
  color: white;
  white-space: pre-wrap;
  overflow: hidden;
  position: relative;
`;

const TextLine = styled.div`
  white-space: pre-wrap;
  margin-bottom: 10px;
`;

const Line = ({ text }) => {
  const [content, setContent] = useState('');
  const speed = 100;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setContent((prev) => prev + text.charAt(index));
      index += 1;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text]);

  return <TextLine>{content}</TextLine>;
};

const Home = () => {
  const textArray = [
    'Doo you need a site for your business?',
    'Heere I am!',
    'I  can make any website you need!',
  ];

  const [index, setIndex] = useState(0);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6000); // 3000ms = 3s

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    return () => setIndex(0); // reset the index when the component is unmounted
  }, []);

  useEffect(() => {
    if (index < textArray.length - 1) {
      const timeoutId = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, textArray[index].length * 100);
      return () => clearTimeout(timeoutId);
    }
  }, [index, textArray]);

  return (
    <div id="home" name="home" className="w-full h-full bg-gradient-to-t from-[#050214] to-[#2c1a85]" style={{ minHeight: 'screen' }}>
      <div className='min-w-full min-h-screen lg:flex justify-center' style={{ minHeight: 'calc(100vh)' }}>
        <div className='flex flex-col justify-center items-center bg-[#050214] p-4 min-w-full lg:min-w-0 lg:w-full xl:max-w-[720px]' style={{ minHeight: 'calc(50vh)' }}>
          <TypeWriterContainer>
            {textArray.slice(0, index + 1).map((line, idx) => (
              <Line key={idx} text={line} />
            ))}
          </TypeWriterContainer>
          {showButton && (
            <button className='bg-[#C10C99] rounded-xl py-4 px-6 mt-6 mb-4 hover:bg-[#9C0C84] focus:outline-none text-white animate-fadeIn'>
            Here is my work
          </button>
          
          )}
        </div>
        <div className='flex justify-center body-bg-image items-center bg-red-400 p-4 min-w-full lg:min-w-0 lg:w-full xl:max-w-[720px]' style={{ minHeight: '50vh' }}>
          <button className='bg-[#C10C99] rounded-xl py-4 px-6 mt-6 mb-4 hover:bg-[#9C0C84] focus:outline-none text-white'>Take an offer</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
