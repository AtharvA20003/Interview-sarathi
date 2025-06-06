
"use client"
import React, {useState} from 'react'
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Contact from './_components/Contect';
import Link from 'next/link';
import { FaGithub, FaRocket, FaComments, FaChartBar, FaLinkedin, FaInstagram, FaTimes, FaBars } from "react-icons/fa";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-gray-900 text-gray-100">
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section - Dark Mode */}
        <header className="w-full py-6 bg-gray-800 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            {/* Logo */}
            <div className="flex justify-between w-full md:w-auto items-center">
              <div className="flex items-center">
                <FaRocket className="text-purple-500 w-8 h-8 mr-3" />
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  AI Mock Interview
                </h1>
              </div>

              {/* Hamburger Icon for Mobile */}
              <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? (
                    <FaTimes className="w-6 h-6 text-gray-300" />
                  ) : (
                    <FaBars className="w-6 h-6 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav
              className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0 ${menuOpen ? "flex" : "hidden"
                }`}
            >
              {/* GitHub Link */}
              <div className="flex justify-center md:justify-start mb-4 md:mb-0">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/AtharvA20003/Interview-Sarathi"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>

              {/* Page Links */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <a
                  href="#features"
                  className="text-lg text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Features
                </a>
                <a
                  href="#contact"
                  className="text-lg text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Contact
                </a>
                <a
                  href="#developers"
                  className="text-lg text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Developers
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section - Dark Mode with Gradient */}
        <section className="flex flex-col items-center justify-center text-center py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 px-6 md:px-0 relative overflow-hidden">
          {/* Abstract geometric shapes for modern look */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-500 rounded-full opacity-10"></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-blue-500 rounded-full opacity-10"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Ace Your Next Interview</h2>
            <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">Practice with AI-powered mock interviews and receive personalized feedback to boost your confidence and performance</p>
            <div className="mt-10 flex flex-col md:flex-row justify-center">
              <Link href="/dashboard">
                <Button className="px-8 py-4 md:mr-6 mb-4 md:mb-0 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg shadow-lg transition-all duration-300 text-white h-16">
                  Get Started
                </Button>
              </Link>
              <a
                href="#features"
                className="px-8 py-4 text-lg font-semibold border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section - Dark Mode */}
        <section id="features" className="py-24 bg-gray-800 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Powerful Features</h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI Mock Interview platform is designed to give you the edge in your interview preparation
            </p>
            <div className="flex flex-wrap justify-center mt-12">
              <div className="w-full md:w-1/3 px-4 py-6">
                <div className="bg-gray-700 rounded-xl p-8 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex justify-center mb-6">
                    <FaRocket className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">AI Mock Interviews</h3>
                  <p className="text-gray-300">Experience realistic interview scenarios powered by advanced AI technology. Practice in a stress-free environment anytime, anywhere.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-6">
                <div className="bg-gray-700 rounded-xl p-8 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex justify-center mb-6">
                    <FaComments className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Instant Feedback</h3>
                  <p className="text-gray-300">Get detailed, personalized feedback on your responses. Learn your strengths and identify areas for improvement in real-time.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-6">
                <div className="bg-gray-700 rounded-xl p-8 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex justify-center mb-6">
                    <FaChartBar className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 ">Overview</h3>
                  <p className="text-gray-300">Access detailed performance analytics and progress tracking. Track your improvement over time with clear metrics and actionable insights.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900 to-gray-800 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Interview Experience?</h2>
            <Link href="/dashboard">
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg shadow-lg transition-all duration-300 text-white">
                Start Practicing Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Contact Section - Dark Mode */}
        <section id="contact" className="py-24 bg-gray-800 px-6 md:px-0">
          <Contact />
        </section>
      </main>

      <footer className="py-10 bg-black text-gray-300">
        <div className="container mx-auto text-center space-y-8">

          {/* Developer Section */}
          <div id='developers'>
            <h2 className="text-2xl font-bold text-purple-400 glow-sm mb-6">💻 Developers</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">

              <div
                className="relative p-5 w-full md:w-72 rounded-xl overflow-hidden border border-purple-600/30 backdrop-blur-md hover:shadow-xl transition"
                style={{
                  backgroundImage: "url('https://wallpaperaccess.com/full/1135431.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">Atharva Joshi</h3>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a href="https://www.linkedin.com/in/atharva-joshi-902970225/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="w-5 h-5 text-blue-400 hover:text-blue-600 transition" />
                    </a>
                    <a href="https://github.com/AtharvA20003" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-5 h-5 hover:text-white transition" />
                    </a>
                    <a href="https://www.instagram.com/dau02_11?igsh=MXBvenB0YWk3azJ5MA==" target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="w-5 h-5 text-pink-400 hover:text-pink-600 transition" />
                    </a>
                  </div>
                </div>
              </div>


              <div
                className="relative p-5 w-full md:w-72 rounded-xl overflow-hidden border border-purple-600/30 backdrop-blur-sm hover:shadow-xl transition"
                style={{
                  backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT2xpcLHWvnA-cK2maGv8LWyEih62rXN6Cgg&s')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">Rohit Sinha</h3>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a href="https://www.linkedin.com/in/rohit-sinha-543385225/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="w-5 h-5 text-blue-400 hover:text-blue-600 transition" />
                    </a>
                    <a href="https://github.com/rohitsinha404" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-5 h-5 hover:text-white transition" />
                    </a>
                    <a href="https://www.instagram.com/rohitsinha404?igsh=YmZ6MmV4b2psamVx" target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="w-5 h-5 text-pink-400 hover:text-pink-600 transition" />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="relative p-5 w-full md:w-72 rounded-xl overflow-hidden border border-purple-600/30 backdrop-blur-lg hover:shadow-xl transition"
                style={{
                  backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6TX7ZNGEYyxyLGf-ybRyZqSDsjsjt42hzpA&s')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">Utkarsh Soni</h3>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a href="https://www.linkedin.com/in/utkarsh-soni-75390321b/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="w-5 h-5 text-blue-400 hover:text-blue-600 transition" />
                    </a>
                    <a href="https://github.com/Utkarsh-soni328" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-5 h-5 hover:text-white transition" />
                    </a>
                    <a href="https://www.instagram.com/rishish_soni?igsh=aXNka2N0MWN5NWcx" target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="w-5 h-5 text-pink-400 hover:text-pink-600 transition" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Footer Info */}
          <div className="border-t border-gray-700 pt-6">
            <p>© 2025 AI Mock Interview. All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-500">Designed to help you succeed in your career journey</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Page