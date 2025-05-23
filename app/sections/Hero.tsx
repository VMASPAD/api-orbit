"use client"
import { Pacifico, Righteous } from 'next/font/google';
import localFont from 'next/font/local';
import React from 'react'
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import { motion } from "motion/react"
const calSans = localFont({
  src: '../../public/fonts/CalSans-Regular.ttf',
  display: 'swap',
  variable: '--font-calsans',
});

function Hero() {
  return (    <div className={`${calSans.className} px-4 sm:px-6 md:px-8`}>
      <div className='flex flex-col md:flex-row gap-5 items-center md:items-start'>
        <motion.img 
          src={"/apiorbit.svg"}
          initial={{ opacity: 0, x: 100, filter: "blur(30px)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          className="w-32 h-32 md:w-auto md:h-auto"
        />
        <motion.div
          initial={{ opacity: 0, y: 100, filter: "blur(30px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="text-center md:text-left"
        >
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl"><GradientText animationSpeed={8} colors={["#a27866", "#a27866", "#bbac92", "#59453e", "#e5c7b7"]}>API Orbit</GradientText></h1>
          <p className="text-gray-300 text-xl sm:text-2xl md:text-4xl max-w-full md:w-[30rem]">Create APIs the way you want and deploy them in production.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
