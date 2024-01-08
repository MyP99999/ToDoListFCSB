'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Verify = ({ res }) => {
    const sliderVariants = {
        initial: {
            x: 0,
        },
        animate: {
            x: "-220%",
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 15,
            }
        }
    }
    return (
        <div className='h-screen flex flex-col items-center justify-center relative'>
            <h1>{res?.msg}</h1>
            <Image src="/welcome.jpg" alt="bin" width={600} height={600} className='z-10'/>
            <motion.div className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-[#f7e0356c] w-1/2 font-bold pointer-events-none" variants={sliderVariants} initial="initial" animate="animate">
                FC FCSB SA
            </motion.div>
        </div>)
}

export default Verify