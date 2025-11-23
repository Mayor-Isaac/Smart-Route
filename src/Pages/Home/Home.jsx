import React from 'react'

export default function Home() {
  return (
    <>
      <section className="bg-[#004225] text-white h-[700px] md:h-[640px] relative overflow-hidden">
        <header className="flex items-center justify-between px-8 py-4">
          <div className="logo">
            <h3 className="text-3xl">
              <span style={{ fontFamily: 'Rochester, cursive' }} className="text-[#39ff14] text-4xl">Smart</span>
              <span className="ml-2">Route</span>
            </h3>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 list-none">
              <li><a className="font-bold hover:border-b-2 hover:border-[#39ff14] transition py-1" href="#">Home</a></li>
              <li><a className="font-bold hover:border-b-2 hover:border-[#39ff14] transition py-1" href="#feature">About</a></li>
              <li><a className="font-bold hover:border-b-2 hover:border-[#39ff14] transition py-1" href="#footer">Contact</a></li>
            </ul>
          </nav>

          <div className="menu md:hidden text-[#39ff14] cursor-pointer">
            <i className="fa-solid fa-bars"></i>
          </div>
        </header>

        <div className="hero flex flex-col md:flex-row items-center gap-10 mt-6 px-5 md:px-12">
          <div className="hero-text w-full md:w-7/12 text-center md:text-left">
            <div>
              <h1 className="text-[#39ff14] uppercase text-5xl md:text-6xl font-extrabold">Navigate Safer,</h1>
              <h2 className="text-3xl md:text-4xl italic mt-2">Drive Smarter</h2>
            </div>
            <p className="mt-8 text-2xl md:text-3xl" style={{ fontFamily: 'Rochester, cursive', fontWeight: 300 }}>
              Avoid potholes, rough roads, and unexpected hazards with intellignet route optimization.
            </p>

            <div className="btn-container flex justify-center md:justify-start gap-6 mt-8">
              <button className="px-8 py-3 rounded-md bg-[#39ff14] text-white text-xl">
                <a href="#">Contact Us</a>
              </button>
              <button className="px-6 py-3 rounded-md bg-[#39ff14] text-white text-xl flex items-center gap-2 hover:bg-white hover:text-[#39ff14] transition">
                <a href="#feature">Read More</a>
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>

          <div className="hero-image w-full md:w-5/12 relative h-[320px] md:h-[400px] flex items-center justify-center">
            <div className="absolute rounded-full bg-[#39ff14] w-[280px] h-[280px] md:w-[380px] md:h-[380px] left-1/3 top-8 -z-10"></div>
            <img className="w-2/3 h-full object-contain" src="/img/removebg-preview.png" alt="A white car image" />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="custom-shape-divider-bottom absolute -bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-[108%] h-[167px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      <section id="feature" className="mt-24 px-6 md:px-20">
        <div className="product flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-5xl text-center">Product Features</h1>
          <p className="feature-description text-center w-full md:w-3/4 mt-4 text-lg md:text-xl">
            The Smart Road Assistance Systems is a technology designed to reduce road accidents and enhance travel safety by leveraging IoT, machine learning, Artificial Intelligent to detect road anomalies in real-time and provides timely alerts to drivers.
          </p>
        </div>

        <div className="features-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
          <div className="feature relative bg-[#004225] text-white p-8 rounded-lg shadow-lg">
            <div className="icon absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#39ff14] flex items-center justify-center text-2xl">
              <i className="fa-solid fa-clock"></i>
            </div>
            <h3 className="text-[#39ff14] mt-6 text-2xl">Real-Time Detection</h3>
            <p className="mt-3">Detects road anomalies in real-time using <strong className="text-[#39ff14] italic">sensors and AI algorithms.</strong></p>
          </div>

          <div className="feature relative bg-[#004225] text-white p-8 rounded-lg shadow-lg">
            <div className="icon absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#39ff14] flex items-center justify-center text-2xl">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3 className="text-[#39ff14] mt-6 text-2xl">Accurate Mapping</h3>
            <p className="mt-3">Maps road anomalies with <strong className="text-[#39ff14] italic">high precision</strong>, providing a detailed view</p>
          </div>

          <div className="feature relative bg-[#004225] text-white p-8 rounded-lg shadow-lg">
            <div className="icon absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#39ff14] flex items-center justify-center text-2xl">
              <i className="fa-regular fa-bell"></i>
            </div>
            <h3 className="text-[#39ff14] mt-6 text-2xl">Instant Alerts</h3>
            <p className="mt-3">Notifies <strong className="text-[#39ff14] italic">instantly</strong> about detected issues.</p>
          </div>

          <div className="feature relative bg-[#004225] text-white p-8 rounded-lg shadow-lg">
            <div className="icon absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#39ff14] flex items-center justify-center text-2xl">
              <i className="fa-solid fa-database"></i>
            </div>
            <h3 className="text-[#39ff14] mt-6 text-2xl">Data-Driven Insights</h3>
            <p className="mt-3">Analyzes frequency, severity, and locations of anomalies for <strong className="text-[#39ff14] italic">better planning.</strong></p>
          </div>

          <div className="feature relative bg-[#004225] text-white p-8 rounded-lg shadow-lg">
            <div className="icon absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#39ff14] flex items-center justify-center text-2xl">
              <i className="fa-solid fa-mobile-screen"></i>
            </div>
            <h3 className="text-[#39ff14] mt-6 text-2xl">Web and Mobile App Integration</h3>
            <p className="mt-3">Monitors and manage road anomalies directly through the <strong className="text-[#39ff14] italic">mobile app.</strong></p>
          </div>

          <div className="feature relative bg-[#004225] text-white p-8 rounded-lg shadow-lg">
            <div className="icon absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#39ff14] flex items-center justify-center text-2xl">
              <i className="fa-solid fa-arrow-up-right-dots"></i>
            </div>
            <h3 className="text-[#39ff14] mt-6 text-2xl">Affordable and Scalable Solution</h3>
            <p className="mt-3">It is designed to be <strong className="text-[#39ff14] italic">low-cost and scalable</strong>, suitable for development in cities, town and rural areas.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works mt-20 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl text-center mb-3">How Does <em style={{ color: '#39ff14' }}>SmartRoute</em> Work?</h1>
        <p className="text-center italic text-lg mb-8">Drive with confidence in 3 Easy Steps</p>

        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-[#004225] rounded-xl p-6 flex gap-4 items-start hover:shadow-lg transition">
            <div>
              <h3 className="text-3xl font-bold text-[#004225]">01</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold">IoT device collects road data</h3>
              <p className="mt-2 text-sm">Smart sensors (accelerometer, gyroscope, GPS) track road conditions. <br />Internet connectivity ensures consistent data transmission.</p>
            </div>
          </div>

          <div className="border-2 border-[#004225] rounded-xl p-6 flex gap-4 items-start hover:shadow-lg transition">
            <div>
              <h3 className="text-3xl font-bold text-[#004225]">02</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI Analyses &amp; Predicts Road Hazards</h3>
              <p className="mt-2 text-sm">Neural networks process real-time and historical road data. <br />Advanced optimized algorithms predict road anomalies and suggest safe routes.</p>
            </div>
          </div>

          <div className="border-2 border-[#004225] rounded-xl p-6 flex gap-4 items-start hover:shadow-lg transition">
            <div>
              <h3 className="text-3xl font-bold text-[#004225]">03</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Alerts &amp; Optimized Routes for Users</h3>
              <p className="mt-2 text-sm">Receive instant notifications and visual markers on the map. <br />SmartRoute suggests the best alternative paths for a smooth drive.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="differ mt-20 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl text-center mb-6">What makes <em style={{ color: '#39ff14' }}>SmartRoute</em> Unique?</h1>
        <div className="bg-[#004225] text-white rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3"><i className="fa-solid fa-thumbs-up text-[#39ff14] text-2xl mt-1" /><strong className="text-[#39ff14]">Comprehensive Road Condition Insights</strong><span className="ml-2">- Combines satellite data, AI-driven analysis, and crowdsourced reports for superior accuracy</span></div>
          <div className="flex items-start gap-3"><i className="fa-solid fa-thumbs-up text-[#39ff14] text-2xl mt-1" /><strong className="text-[#39ff14]">Real-Time Notifications</strong><span className="ml-2">- Get Instant alerts on potholes, rough roads, and other anomalies.</span></div>
          <div className="flex items-start gap-3"><i className="fa-solid fa-thumbs-up text-[#39ff14] text-2xl mt-1" /><strong className="text-[#39ff14]">Route Optimization</strong><span className="ml-2">- Avoid damaged roads and traffic congestion with AI-powered alternative route suggestion.</span></div>
          <div className="flex items-start gap-3"><i className="fa-solid fa-thumbs-up text-[#39ff14] text-2xl mt-1" /><strong className="text-[#39ff14]">Data-Driven Maintenance</strong><span className="ml-2">- Helps authorities and businesses plan protective road maintenance strategies.</span></div>
          <div className="flex items-start gap-3"><i className="fa-solid fa-thumbs-up text-[#39ff14] text-2xl mt-1" /><strong className="text-[#39ff14]">Machine Learning Analysis</strong><span className="ml-2">- Continuously learns from road usage patterns to improve predictions.</span></div>
          <div className="flex items-start gap-3"><i className="fa-solid fa-thumbs-up text-[#39ff14] text-2xl mt-1" /><strong className="text-[#39ff14]">Tailored for Nigeria &amp; Beyond</strong><span className="ml-2">- Designed for local conditions and deployment.</span></div>
        </div>
        <p className="text-center italic mt-6">Drive smarter, avoid hazards, and experience safer travel with our AI-powered road intelligence!</p>
      </section>

      <section className="testimonial mt-20 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl text-center mb-8">What Our Happy <br/> Users Say</h1>
        <div className="testimonial-container grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#004225] text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-[#39ff14] text-2xl mb-4">Ade Imisiola</h2>
            <p className="testimony leading-relaxed">I've been driving for years, but it wasn't until I started using SmarRoute that I realised how many hidden dangers were lurking on our ways. <br /> I rely on the app to alert me about potholes, ramps, and other road anomalies that could damage my vehicle or worse. <br /> One day, I was driving home from work during a heavy downpour when the app warned me about a massive pothole on the highway. I was able to slow down just in time, avioding a potentially disastrous blowout <br /> Thanks to SmartRoute, I've been able to avoid costly repairs and reduce my stress levels while driving. The app has made my commutate safer and more enjoyable.</p>
            <button className="mt-6 px-6 py-2 bg-white text-[#004225] rounded-full italic hover:bg-transparent hover:text-[#39ff14] border transition">See More</button>
          </div>

          <div className="bg-[#004225] text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-[#39ff14] text-2xl mb-4">Jamila Haruna</h2>
            <p className="testimony leading-relaxed">I was skeptical about using SmartRoute at first and it has changed the way I drive. The real-time notifications about road hazards and navigation to safer routes have been a game-changer. <br />I recall one instance where I was driving to a meeting during rush hour, and the app alerted me to a multi-vehicle accident on my usual route. SmartRoute quickly rerouted me to a safer, alternative route, saving me at least 1 hour of traffic time. <br />The app's ability to provide real-time updates and adapt to changing road conditions has reduced my stress levels and made me a more confident driver. I've even started to enjoy my commute! <br />SmartRoute is an essential tool for any driver who wants to stay safe and avoid unnecessary delays.</p>
            <button className="mt-6 px-6 py-2 bg-white text-[#004225] rounded-full italic hover:bg-transparent hover:text-[#39ff14] border transition">See More</button>
          </div>

          <div className="bg-[#004225] text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-[#39ff14] text-2xl mb-4">Abubakar Olaoluwa</h2>
            <p className="testimony leading-relaxed">As a city planner, I've seen firsthand the impact that road anomalies can have on traffic flow, safety, and economic development. That's why I'm thrilled to see the valuable insights provided by SmartRoute’s data analytics platform. <br />The platform's ability to collect and analyze data on road anomalies has been an insightful and delightful experience for our city's infrastructure planning. We can now identify high-risk areas, track trends, and prioritize maintenance and repair efforts. <br />With SmartRoute’s data, we've been able to make informed decisions about where to allocate resources, resulting in significant cost savings and improved road safety. The platform has also enabled us to engage with citizens and stakeholders more effectively, providing them with accurate and timely information about road conditions. <br />I highly recommend SmartRoute data analytics platform to any government agency or stakeholder looking to make data-driven decisions about road infrastructure</p>
            <button className="mt-6 px-6 py-2 bg-white text-[#004225] rounded-full italic hover:bg-transparent hover:text-[#39ff14] border transition">See More</button>
          </div>

          <div className="bg-[#004225] text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-[#39ff14] text-2xl mb-4">Adaeze Nwosu</h2>
            <p className="testimony leading-relaxed">SmartRoute has been a valuable partner for our freight company. Their road anomaly notification system has significantly improved our operations. <br />We've seen a substantial reduction in vehicle damage and maintenance costs thanks to the real-time alerts on road hazards such as potholes, uneven lanes, and construction zones. Our drivers can now take proactive measures to avoid these hazards, reducing the wear and tear on our vehicles. <br />The road anomaly data has also enabled us to optimize our routes, reducing transit times and improving on-time delivery rates. <br />SmartRoute has helped us reduce costs, improve operational efficiency, and enhance our customer satisfaction.</p>
            <button className="mt-6 px-6 py-2 bg-white text-[#004225] rounded-full italic hover:bg-transparent hover:text-[#39ff14] border transition">See More</button>
          </div>
        </div>
      </section>

      <section className="cta mt-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-8 bg-[url('/img/new-bg.webp')] bg-center bg-cover py-16 rounded-lg">
        <div className="w-full md:w-1/2 bg-white/60 p-6 rounded">
          <h1 className="text-4xl md:text-5xl text-[#004225]">Let's get started with <strong className="text-[#39ff14]">SmartRoute</strong></h1>
        </div>

        <div className="form w-full md:w-1/2 bg-white/80 p-6 rounded text-center">
          <h2 className="text-3xl text-[#004225]">BOOK NOW</h2>
          <p className="text-sm italic text-[#004225]">Take your drive safe</p>
          <input className="w-full mt-4 p-3 rounded bg-[#004225] text-white placeholder-white border-none focus:outline-2 focus:outline-[#004225]" type="text" placeholder="Name" />
          <input className="w-full mt-4 p-3 rounded bg-[#004225] text-white placeholder-white border-none focus:outline-2 focus:outline-[#004225]" type="text" placeholder="Email" />
          <input className="w-full mt-4 p-3 rounded bg-[#004225] text-white placeholder-white border-none focus:outline-2 focus:outline-[#004225]" type="tel" placeholder="Phone Number" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm italic text-[#004225] flex items-center gap-2"><i className="fa-solid fa-circle-info text-[#004225]" /> Your information is safe with us, secured by advanced encryption.</p>
            <button className="px-6 py-3 border-2 border-[#004225] text-[#004225] rounded hover:bg-[#004225] hover:text-white transition">Get a device</button>
          </div>
        </div>
      </section>

      <footer id="footer" className="mt-20 bg-[#004225] text-white rounded-t-3xl py-10 px-6 md:px-20">
        <div className="details flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="download flex items-center gap-6">
            <div className="flex items-center gap-4 border border-white rounded px-4 py-2">
              <i className="fa-brands fa-apple text-xl" />
              <div>
                <p className="text-sm">Download on</p>
                <h4 className="text-lg">App Store</h4>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-white rounded px-4 py-2">
              <i className="fa-brands fa-google-play text-xl" />
              <div>
                <p className="text-sm">Get on the</p>
                <h4 className="text-lg">Play Store</h4>
              </div>
            </div>
          </div>

          <div className="socials flex items-center gap-4">
            <a href="#" className="text-white text-xl"><i className="fa-brands fa-facebook" /></a>
            <a href="#" className="text-white text-xl"><i className="fa-brands fa-x-twitter" /></a>
            <a href="#" className="text-white text-xl"><i className="fa-brands fa-instagram" /></a>
            <a href="#" className="text-white text-xl"><i className="fa-brands fa-linkedin" /></a>
            <a href="#" className="text-white text-xl"><i className="fa-solid fa-envelope" /></a>
          </div>
        </div>

        <p className="text-center mt-6">&copy; 2025 Copyright SmartRoute Services</p>
      </footer>
    </>
  )
}
