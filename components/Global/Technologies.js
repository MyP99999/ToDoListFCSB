import React from 'react';
import Image from 'next/image';

const Technologies = () => {
  const tech = [
    { id: 1, src: '/html.png', title: 'HTML', style: 'shadow-orange-600' },
    { id: 2, src: '/css.png', title: 'CSS', style: 'shadow-blue-500' },
    { id: 3, src: '/javascript.png', title: 'JAVASCRIPT', style: 'shadow-yellow-500' },
    { id: 4, src: '/react.png', title: 'REACT', style: 'shadow-blue-600' },
    { id: 5, src: '/nextjs.png', title: 'NEXT.JS', style: 'shadow-orange-500' },
    { id: 6, src: '/tailwind.png', title: 'TAILWIND', style: 'shadow-sky-400' },
    { id: 7, src: '/github.png', title: 'GITHUB', style: 'shadow-gray-400' },
    { id: 8, src: '/firebase.png', title: 'FIREBASE', style: 'shadow-orange-400' },
  ];

  return (
    <div id="technologies" name="technologies" className='flex items-center bg-gradient-to-b from-[#050214] to-[#2c1a85] w-full min-h-screen'>
      <div className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white'>
        <div className='mt-12 text-center'>
          <p className='text-4xl font-bold border-b-4 border-gray-500 p-2 inline'>Technologies</p>
          <p className='py-6'>These are the technologies I've worked with</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
          {tech.map(({ id, src, title, style }) => (
            <div key={id} className={`shadow-md hover:scale-105 transform duration-500 flex flex-col items-center justify-center py-2 rounded-lg ${style}`}>
              <Image src={src} alt={title} width={80} height={80} />
              <p className='mt-4'>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Technologies;
