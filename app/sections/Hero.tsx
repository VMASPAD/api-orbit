"use client"
import { Pacifico, Righteous } from 'next/font/google';
import localFont from 'next/font/local';
import React from 'react'
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import { motion } from "motion/react"
const pacifico = Pacifico({
  weight: "400"
});
const righteous = Righteous({
  weight: "400"
});

const calSans = localFont({
  src: '../../public/fonts/CalSans-Regular.ttf',
  display: 'swap',
  variable: '--font-calsans',
});

function Hero() {
  return (
    <div className={`${calSans.className}`}>
      <div className='flex flex-row gap-5'>
        <motion.img src={"https://placehold.co/100x100"}
          initial={{ opacity: 0, x: 100, filter: "blur(30px)" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 100, filter: "blur(30px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          <h1 className="text-white text-8xl "><GradientText animationSpeed={8} colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}>My App</GradientText></h1>
          <p className="text-gray-300 text-4xl">Enjoy the beautiful aurora visuals.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
