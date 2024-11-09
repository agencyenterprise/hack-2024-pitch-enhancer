"use client";

import React from "react";
import Image from "next/image";
import tealEllipse from "../images/ellipse-3.png";
import pinkEllipse from "../images/ellipse-4.png";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Image
        src={tealEllipse}
        alt="teal gradient, background decoration"
        className="absolute left-0 top-0 -z-10 opacity-60"
      />
      <Image
        src={pinkEllipse}
        alt="pink gradient, background decoration"
        className="absolute right-0 top-[20%] -z-10 opacity-60"
      />

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl"
        >
          <h1 className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-500/30 border border-gray-200/30 backdrop-blur-sm mx-auto">
            <MicrophoneIcon className="h-8 w-8 text-red-300" />
            <p>
              <span className="font-bold text-white text-3xl">Pitch</span>{" "}
              <span className="font-thin text-red-300 text-3xl">Enhancer</span>
            </p>
          </h1>

          <h2 className="text-white text-5xl font-bold leading-relaxed">
            Turn Your
            <span className="text-red-300"> Brilliant Ideas </span>
            into Confident Pitches
          </h2>

          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Created specifically for shy developers who have amazing ideas but
            struggle with presenting them. Let AI help you craft and practice
            the perfect pitch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-gray-500/10 backdrop-blur-sm rounded-2xl border border-gray-200/10"
            >
              <h3 className="text-red-300 text-xl font-bold mb-3">
                Record & Practice
              </h3>
              <p className="text-gray-300">
                Practice your pitch privately and get instant feedback on your
                delivery
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gray-500/10 backdrop-blur-sm rounded-2xl border border-gray-200/10"
            >
              <h3 className="text-red-300 text-xl font-bold mb-3">
                AI Analysis
              </h3>
              <p className="text-gray-300">
                Get personalized tips on improving your pitch structure and
                delivery style
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-gray-500/10 backdrop-blur-sm rounded-2xl border border-gray-200/10"
            >
              <h3 className="text-red-300 text-xl font-bold mb-3">
                Build Confidence
              </h3>
              <p className="text-gray-300">
                Transform from shy developer to confident presenter at your own
                pace
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/pitching"
              className="px-8 py-4 bg-red-400/80 rounded-full text-white hover:bg-red-600 transition-all text-lg font-semibold hover:scale-105"
            >
              Become a Master Pitcher!
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Add Pricing Section after the hero section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-6xl w-full"
        >
          <h2 className="text-4xl font-bold text-white mb-12">
            Choose Your <span className="text-red-300">Perfect Plan</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gray-500/10 backdrop-blur-sm rounded-2xl border border-gray-200/10 hover:border-red-300/30 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Free Plan</h3>
              <p className="text-red-300 text-4xl font-bold mb-6">$0</p>
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  General pitch review
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  3-minute optimized pitch
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Basic feedback on delivery
                </div>
              </div>
              <Link
                href="/pitching"
                className="inline-block px-8 py-3 bg-gray-500/30 rounded-full text-white hover:bg-gray-500/50 transition-all text-lg font-semibold"
              >
                Start Free
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-gradient-to-br from-red-400/20 to-gray-500/10 backdrop-blur-sm rounded-2xl border border-red-300/30 hover:border-red-300/50 transition-all"
            >
              <div className="inline-block px-4 py-1 bg-red-300/20 rounded-full text-red-300 text-sm mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
              <p className="text-red-300 text-4xl font-bold mb-6">$69.99</p>
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Everything in Free plan
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  In-depth tone analysis
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Video analysis feedback
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Customizable style targets
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 text-red-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Priority AI processing
                </div>
              </div>
              <Link
                href="/pitching"
                className="inline-block px-8 py-3 bg-red-400/80 rounded-full text-white hover:bg-red-600 transition-all text-lg font-semibold hover:scale-105"
              >
                Get Pro Access
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
