import React, { useState, useEffect } from 'react'
import {
  FaBars,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaRegBell,
  FaDatabase,
  FaMobileAlt,
  FaThumbsUp,
  FaInfoCircle,
  FaApple,
  FaGooglePlay,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTimes,
  FaArrowUp
} from 'react-icons/fa'
import { GoArrowUpRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import { homeData } from './data';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedTestimonials, setExpandedTestimonials] = useState({})
  const [showScrollTop, setShowScrollTop] = useState(false)

  const toggleTestimonial = (index) => {
    setExpandedTestimonials(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const headerOffset = 80 // Height of fixed header
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <section className="relative h-[700px] overflow-hidden bg-[#004225] text-white md:h-[640px]">
        <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-[#004225] px-8 py-4">
          <div className="logo">
            <h3 className="text-3xl">
              <span
                style={{ fontFamily: 'Rochester, cursive' }}
                className="text-4xl text-[#39ff14]"
              >
                Smart
              </span>
              <span className="ml-2">Route</span>
            </h3>
          </div>

          <nav className="hidden md:block">
            <ul className="flex list-none items-center gap-8">
              <li>
                <a
                  className="py-1 font-bold transition hover:border-b-2 hover:border-[#39ff14] cursor-pointer"
                  onClick={scrollToTop}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="py-1 font-bold transition hover:border-b-2 hover:border-[#39ff14] cursor-pointer"
                  onClick={(e) => handleSmoothScroll(e, '#feature')}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="py-1 font-bold transition hover:border-b-2 hover:border-[#39ff14] cursor-pointer"
                  onClick={(e) => handleSmoothScroll(e, '#footer')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <nav
            className={`fixed left-0 top-16 z-40 w-full bg-[#004225f9] shadow shadow-[#eaeaea] transition-all duration-300 md:hidden ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex list-none flex-col items-center gap-6 py-6">
              <li>
                <a
                  className="py-1 font-bold transition hover:border-b-2 hover:border-[#39ff14] cursor-pointer"
                  onClick={scrollToTop}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="py-1 font-bold transition hover:border-b-2 hover:border-[#39ff14] cursor-pointer"
                  onClick={(e) => handleSmoothScroll(e, '#feature')}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="py-1 font-bold transition hover:border-b-2 hover:border-[#39ff14] cursor-pointer"
                  onClick={(e) => handleSmoothScroll(e, '#footer')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div
            className="menu cursor-pointer text-[#39ff14] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </header>

        <div className="hero mt-24 flex flex-col items-center gap-10 px-5 md:flex-row md:px-12">
          <div className="hero-text w-full text-center md:w-7/12 md:text-left">
            <div>
              <h1 className="text-5xl font-extrabold uppercase text-[#39ff14] md:text-6xl">
                Navigate Safer,
              </h1>
              <h2 className="mt-2 text-3xl italic md:text-4xl">
                Drive Smarter
              </h2>
            </div>
            <p
              className="mt-8 text-2xl md:text-3xl"
              style={{ fontFamily: 'Rochester, cursive', fontWeight: 300 }}
            >
              Avoid potholes, rough roads, and unexpected hazards with
              intellignet route optimization.
            </p>

            <div className="btn-container mt-8 flex justify-center gap-6 md:justify-start">
              <Link
                to="/home"
                className="inline-block rounded-md bg-[#39ff14] px-8 py-3 text-center text-xl text-white"
              >
                Get Started
              </Link>
              <button 
                className="flex items-center gap-2 rounded-md bg-[#39ff14] px-6 py-3 text-xl text-white transition hover:bg-white hover:text-[#39ff14]"
                onClick={(e) => handleSmoothScroll(e, '#feature')}
              >
                Read More
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="hero-image relative z-0 flex h-[320px] w-full items-center justify-center md:h-[400px] md:w-5/12">
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/35 md:h-[380px] md:w-[380px]"></div>
            <img
              className="relative z-10 h-full w-2/3 object-contain"
              src="/img/removebg-preview.png"
              alt="A white car image"
            />
          </div>
        </div>
      </section>

      <section className="relative z-20">
        <div className="custom-shape-divider-bottom absolute -bottom-0 left-0 w-full rotate-180 overflow-hidden leading-none">
          <svg
            className="relative block h-[167px] w-[108%]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      <section id="feature" className="mt-24 px-6 md:px-20">
        <div className="product mb-8 flex flex-col items-center">
          <h1 className="text-center text-4xl md:text-5xl">Product Features</h1>
          <p className="feature-description mt-4 w-full text-center text-lg md:w-3/4 md:text-xl">
            The Smart Road Assistance Systems is a technology designed to reduce
            road accidents and enhance travel safety by leveraging IoT, machine
            learning, Artificial Intelligent to detect road anomalies in
            real-time and provides timely alerts to drivers.
          </p>
        </div>

        <div className="features-list grid grid-cols-1 gap-12 gap-x-8 px-4 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
          <div className="feature relative rounded-lg bg-[#004225] p-8 text-white shadow-lg">
            <div className="icon absolute -top-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#39ff14] text-2xl">
              <FaClock />
            </div>
            <h3 className="mt-6 text-2xl text-[#39ff14]">
              Real-Time Detection
            </h3>
            <p className="mt-3">
              Detects road anomalies in real-time using{' '}
              <strong className="italic text-[#39ff14]">
                sensors and AI algorithms.
              </strong>
            </p>
          </div>

          <div className="feature relative rounded-lg bg-[#004225] p-8 text-white shadow-lg">
            <div className="icon absolute -top-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#39ff14] text-2xl">
              <FaMapMarkerAlt />
            </div>
            <h3 className="mt-6 text-2xl text-[#39ff14]">Accurate Mapping</h3>
            <p className="mt-3">
              Maps road anomalies with{' '}
              <strong className="italic text-[#39ff14]">high precision</strong>,
              providing a detailed view
            </p>
          </div>

          <div className="feature relative rounded-lg bg-[#004225] p-8 text-white shadow-lg">
            <div className="icon absolute -top-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#39ff14] text-2xl">
              <FaRegBell />
            </div>
            <h3 className="mt-6 text-2xl text-[#39ff14]">Instant Alerts</h3>
            <p className="mt-3">
              Notifies{' '}
              <strong className="italic text-[#39ff14]">instantly</strong> about
              detected issues.
            </p>
          </div>

          <div className="feature relative rounded-lg bg-[#004225] p-8 text-white shadow-lg">
            <div className="icon absolute -top-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#39ff14] text-2xl">
              <FaDatabase />
            </div>
            <h3 className="mt-6 text-2xl text-[#39ff14]">
              Data-Driven Insights
            </h3>
            <p className="mt-3">
              Analyzes frequency, severity, and locations of anomalies for{' '}
              <strong className="italic text-[#39ff14]">
                better planning.
              </strong>
            </p>
          </div>

          <div className="feature relative rounded-lg bg-[#004225] p-8 text-white shadow-lg">
            <div className="icon absolute -top-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#39ff14] text-2xl">
              <FaMobileAlt />
            </div>
            <h3 className="mt-6 text-2xl text-[#39ff14]">
              Web and Mobile App Integration
            </h3>
            <p className="mt-3">
              Monitors and manage road anomalies directly through the{' '}
              <strong className="italic text-[#39ff14]">mobile app.</strong>
            </p>
          </div>

          <div className="feature relative rounded-lg bg-[#004225] p-8 text-white shadow-lg">
            <div className="icon absolute -top-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#39ff14] text-2xl">
              <GoArrowUpRight />
            </div>
            <h3 className="mt-6 text-2xl text-[#39ff14]">
              Affordable and Scalable Solution
            </h3>
            <p className="mt-3">
              It is designed to be{' '}
              <strong className="italic text-[#39ff14]">
                low-cost and scalable
              </strong>
              , suitable for development in cities, town and rural areas.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works mt-20 px-6 md:px-20">
        <h1 className="mb-3 text-center text-4xl md:text-5xl">
          How Does <em style={{ color: '#39ff14' }}>SmartRoute</em> Work?
        </h1>
        <p className="mb-8 text-center text-lg italic">
          Drive with confidence in 3 Easy Steps
        </p>

        <div className="container grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-start gap-4 rounded-xl border-2 border-[#004225] p-6 transition hover:shadow-lg">
            <div>
              <h3 className="text-3xl font-bold text-[#004225]">01</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                IoT device collects road data
              </h3>
              <p className="mt-2 text-sm">
                Smart sensors (accelerometer, gyroscope, GPS) track road
                conditions. <br />
                Internet connectivity ensures consistent data transmission.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border-2 border-[#004225] p-6 transition hover:shadow-lg">
            <div>
              <h3 className="text-3xl font-bold text-[#004225]">02</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                AI Analyses &amp; Predicts Road Hazards
              </h3>
              <p className="mt-2 text-sm">
                Neural networks process real-time and historical road data.{' '}
                <br />
                Advanced optimized algorithms predict road anomalies and suggest
                safe routes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border-2 border-[#004225] p-6 transition hover:shadow-lg">
            <div>
              <h3 className="text-3xl font-bold text-[#004225]">03</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Alerts &amp; Optimized Routes for Users
              </h3>
              <p className="mt-2 text-sm">
                Receive instant notifications and visual markers on the map.{' '}
                <br />
                SmartRoute suggests the best alternative paths for a smooth
                drive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="differ mt-20 px-6 md:px-20">
        <h1 className="mb-6 text-center text-4xl md:text-5xl">
          What makes <em style={{ color: '#39ff14' }}>SmartRoute</em> Unique?
        </h1>
        <div className="space-y-4 rounded-lg bg-[#004225] p-6 text-white">
          <div className="flex items-start gap-3">
            <FaThumbsUp className="mt-1 text-2xl text-[#39ff14]" />
            <strong className="text-[#39ff14]">
              Comprehensive Road Condition Insights
            </strong>
            <span className="ml-2">
              - Combines satellite data, AI-driven analysis, and crowdsourced
              reports for superior accuracy
            </span>
          </div>
          <div className="flex items-start gap-3">
            <FaThumbsUp className="mt-1 text-2xl text-[#39ff14]" />
            <strong className="text-[#39ff14]">Real-Time Notifications</strong>
            <span className="ml-2">
              - Get Instant alerts on potholes, rough roads, and other
              anomalies.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <FaThumbsUp className="mt-1 text-2xl text-[#39ff14]" />
            <strong className="text-[#39ff14]">Route Optimization</strong>
            <span className="ml-2">
              - Avoid damaged roads and traffic congestion with AI-powered
              alternative route suggestion.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <FaThumbsUp className="mt-1 text-2xl text-[#39ff14]" />
            <strong className="text-[#39ff14]">Data-Driven Maintenance</strong>
            <span className="ml-2">
              - Helps authorities and businesses plan protective road
              maintenance strategies.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <FaThumbsUp className="mt-1 text-2xl text-[#39ff14]" />
            <strong className="text-[#39ff14]">
              Machine Learning Analysis
            </strong>
            <span className="ml-2">
              - Continuously learns from road usage patterns to improve
              predictions.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <FaThumbsUp className="mt-1 text-2xl text-[#39ff14]" />
            <strong className="text-[#39ff14]">
              Tailored for Nigeria &amp; Beyond
            </strong>
            <span className="ml-2">
              - Designed for local conditions and deployment.
            </span>
          </div>
        </div>
        <p className="mt-6 text-center italic">
          Drive smarter, avoid hazards, and experience safer travel with our
          AI-powered road intelligence!
        </p>
      </section>

      <section className="testimonial mt-20 px-6 md:px-20">
        <h1 className="mb-8 text-center text-4xl md:text-5xl">
          What Our Happy <br /> Users Say
        </h1>
        <div className="testimonial-container grid grid-cols-1 gap-6 md:grid-cols-2">
          {homeData.testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-2xl bg-[#004225] p-8 text-white shadow-lg flex flex-col">
              <h2 className="mb-4 text-2xl text-[#39ff14]">{testimonial.name}</h2>
              <div className="testimony leading-relaxed flex-grow">
                {expandedTestimonials[index] ? (
                  testimonial.feedbacks.map((feedback, idx) => (
                    <p key={idx} className="mb-4">
                      <span dangerouslySetInnerHTML={{ __html: feedback }}></span>
                    </p>
                  ))
                ) : (
                  <p className="mb-4 line-clamp-4">
                    <span dangerouslySetInnerHTML={{ __html: testimonial.feedbacks[0] }}></span>
                  </p>
                )}
              </div>
              <button 
                onClick={() => toggleTestimonial(index)}
                className="mt-6 rounded-full border bg-white px-6 py-2 italic text-[#004225] transition hover:bg-transparent hover:text-[#39ff14] self-start"
              >
                {expandedTestimonials[index] ? 'See Less' : 'See More'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cta mt-20 flex flex-col items-center gap-8 rounded-lg bg-[url('/img/new-bg.webp')] bg-cover bg-center px-6 py-16 md:flex-row md:px-20">
        <div className="w-full rounded bg-white/60 p-6 md:w-1/2">
          <h1 className="text-4xl text-[#004225] md:text-5xl">
            Let's get started with{' '}
            <strong className="text-[#39ff14]">SmartRoute</strong>
          </h1>
        </div>

        <div className="form w-full rounded bg-white/80 p-6 text-center md:w-1/2">
          <h2 className="text-3xl text-[#004225]">BOOK NOW</h2>
          <p className="text-sm italic text-[#004225]">Take your drive safe</p>
          <input
            className="mt-4 w-full rounded border-none bg-[#004225] p-3 text-white placeholder-white focus:outline-2 focus:outline-[#004225]"
            type="text"
            placeholder="Name"
          />
          <input
            className="mt-4 w-full rounded border-none bg-[#004225] p-3 text-white placeholder-white focus:outline-2 focus:outline-[#004225]"
            type="text"
            placeholder="Email"
          />
          <input
            className="mt-4 w-full rounded border-none bg-[#004225] p-3 text-white placeholder-white focus:outline-2 focus:outline-[#004225]"
            type="tel"
            placeholder="Phone Number"
          />
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="flex items-center gap-2 text-sm italic text-[#004225]">
              <FaInfoCircle className="text-[#004225]" /> Your information is
              safe with us, secured by advanced encryption.
            </p>
            <button className="rounded border-2 border-[#004225] px-6 py-3 text-[#004225] transition hover:bg-[#004225] hover:text-white">
              Get a device
            </button>
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="mt-20 rounded-t-3xl bg-[#004225] px-6 py-10 text-white md:px-20"
      >
        <div className="details flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="download flex items-center gap-6">
            <div className="flex items-center gap-4 rounded border border-white px-4 py-2">
              <FaApple className="text-xl" />
              <div>
                <p className="text-sm">Download on</p>
                <h4 className="text-lg">App Store</h4>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded border border-white px-4 py-2">
              <FaGooglePlay className="text-xl" />
              <div>
                <p className="text-sm">Get on the</p>
                <h4 className="text-lg">Play Store</h4>
              </div>
            </div>
          </div>

          <div className="socials flex items-center gap-4">
            <a href="#" className="text-xl text-white">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl text-white">
              <FaLinkedin />
            </a>
            <a href="#" className="text-xl text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <p className="mt-6 text-center">
          &copy; 2025 Copyright SmartRoute Services
        </p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#37ff14ba] text-white shadow-lg transition hover:bg-[#004225] hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
}
