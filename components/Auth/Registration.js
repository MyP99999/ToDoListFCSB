'use client'
import React, { useEffect, useState } from 'react';
import SignIn from '@/components/Auth/SignIn';
import SignUp from '@/components/Auth/SignUp';
import Image from 'next/image';

const data = [
    {
        id: 1,
        title: "Echipa Superioara",
        image: "/fcsb4.jpg",
    },
    {
        id: 2,
        title: "Echipa Superioara",
        image: "/fcsb2.jpg",
    },
    {
        id: 3,
        title: "Echipa Superioara",
        image: "/fcsb3.jpg",
    },
    {
        id: 4,
        title: "Echipa Superioara",
        image: "/fcsb5.jpg",
    },
];

const RegistrationPage = ({ callbackUrl } ) => {
    const [isLogin, setIsLogin] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Switch between slides periodically
    useEffect(() => {
        const interval = setInterval(
            () => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
            4000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex flex-col lg:flex-row lg:max-h-[100vh] items-center justify-center bg-white">
            <div className={`w-full lg:w-1/2 h-[90vh] lg:h-[100vh] relative`}>
                <div className={`${!isLogin ? 'lg:opacity-100' : 'lg:opacity-0'} absolute inset-0 transition-opacity duration-500`}>
                    <SignIn callbackUrl={callbackUrl || '/'} />
                </div>
            </div>
            <div className={`w-full lg:w-1/2 h-[90vh] lg:h-[74vh] relative`}>
                <div className={`${isLogin ? 'lg:opacity-100' : 'lg:opacity-0'} absolute inset-0 transition-opacity duration-500`}>
                    <SignUp />
                </div>
            </div>


            {/* Multiple Image Slider */}
            <div className={`hidden lg:block absolute top-0 left-0 w-full lg:w-1/2 h-full transform transition-transform duration-1000 ${isLogin ? 'translate-x-0' : 'translate-x-full'}`}>
                <Image
                    src={data[currentSlide].image}
                    alt={data[currentSlide].title}
                    layout="fill"
                    objectFit="cover"
                    className='w-full h-full relative z-0'
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col gap-8 text-white font-bold z-10">
                    <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
                        {data[currentSlide].title}
                    </h1>
                    <button
                        className="mx-auto mb-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {!isLogin ? 'Creeaza-ti un cont' : 'Intra in cont'}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default RegistrationPage;