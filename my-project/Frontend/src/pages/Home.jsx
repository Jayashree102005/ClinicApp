import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../component/Footer";
import homebg from "../assets/images/home bg.webp"
import dr1 from "../assets/images/doctor1.avif"
import dr2 from "../assets/images/doctor2.avif"
import dr3 from "../assets/images/doctor3.webp"

const Home = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const visionaries = [
    { 
      name: 'Dr. Jonathan Hayes', 
      specialty: 'Founder & Dean of Medicine', 
      img: dr1,
      exp: '35+ Years of Leadership',
      credential: 'M.D., Ph.D. Harvard Medical',
      vision: '"To create a sanctuary of healing where science meets profound empathy."',
      fullBio: "Dr. Jonathan Hayes founded this institution over three decades ago with a singular vision: to revolutionize patient care. Before establishing the hospital, he served as the Chief of Surgery at a leading metropolitan medical center. His groundbreaking research in minimally invasive surgical techniques has been published in over 50 peer-reviewed journals. Today, he focuses on mentoring the next generation of medical leaders and ensuring our hospital remains at the forefront of medical innovation."
    },
    { 
      name: 'Dr. Sarah Jenkins', 
      specialty: 'Co-Founder & Chief Medical Officer', 
      img: dr2,
      exp: '30+ Years Experience',
      credential: 'F.A.C.S. Johns Hopkins',
      vision: '"Innovating clinical practices to deliver unmatched patient outcomes."',
      fullBio: "Dr. Sarah Jenkins is the clinical cornerstone of our hospital. With a background as a globally recognized cardiovascular surgeon, she oversees all clinical operations to ensure the highest standards of patient safety and care quality. Dr. Jenkins was instrumental in developing our Centers of Excellence model and frequently speaks globally on healthcare administration and systemic patient safety protocols."
    },
    { 
      name: 'Dr. Marcus Reynolds', 
      specialty: 'Dean of Research & Innovation', 
      img: dr3,
      exp: '25+ Years Experience',
      credential: 'M.D., Stanford University',
      vision: '"Bridging the gap between tomorrow’s cures and today’s care."',
      fullBio: "As the head of our research division, Dr. Marcus Reynolds bridges the gap between laboratory discoveries and bedside treatments. His pioneering work in neuroplasticity and clinical trial design has brought several experimental treatments into our standard care offerings. He leads a team of 40+ researchers dedicated to advancing medical science in oncology, neurology, and advanced therapeutics."
    }
  ];

  return (
    <>
      <div className="bg-slate-50 text-gray-900 overflow-x-hidden font-sans relative">
        
        {/* 1. Hero Banner */}
        <section 
          className="relative h-[85vh] flex items-center justify-center bg-cover bg-center" 
          style={{ backgroundImage: `url(${homebg})` }}
        >
         <div className="absolute inset-0 bg-blue-900/15" />
<div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/30 to-slate-900/10" />
          
          <div className="relative z-10 text-center px-4 text-white mt-10 w-full max-w-5xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-300/30 text-sm font-bold tracking-widest mb-6 uppercase shadow-lg text-blue-100">
              Your Health, Our Priority
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
              Advanced Healthcare,<br />Tailored to You
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg text-gray-200">
              Experience world-class medical expertise supported by cutting-edge technology and compassionate care. Your health journey begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/doctors" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1">
                Schedule a Consultation
              </Link>
              <Link to="/service" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl transform hover:-translate-y-1">
                Explore Services
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Stats Bar */}
        <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-4 mb-20">
          <div className="bg-white rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 py-8 px-4 border border-gray-50">
            {[ 
              ['500+', 'Specialists'], 
              ['50k+', 'Treatments'], 
              ['4.9/5', 'Satisfaction'], 
              ['24/7', 'Emergency'] 
            ].map((stat, i) => (
              <div key={i} className="text-center py-4 md:py-0">
                <div className="text-4xl font-black text-blue-600 mb-1">{stat[0]}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">{stat[1]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Centers of Excellence */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Centers of Excellence</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Comprehensive medical departments equipped with state-of-the-art diagnostic and therapeutic technology.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[ 
              { title: 'General Medicine', icon: 'bi-clipboard2-pulse', color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Comprehensive primary care and holistic health management for all ages.' }, 
              { title: 'Cardiology', icon: 'bi-heart-pulse', color: 'text-rose-500', bg: 'bg-rose-50', desc: 'State-of-the-art diagnostics and treatments for optimal heart health.' }, 
              { title: 'Neurology', icon: 'bi-activity', color: 'text-purple-500', bg: 'bg-purple-50', desc: 'Expert diagnostic and therapeutic care for complex nervous system conditions.' },
              { title: 'Dermatology', icon: 'bi-droplet-half', color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Advanced medical, surgical, and cosmetic skin care solutions.' },
              { title: 'Gynecology', icon: 'bi-gender-female', color: 'text-pink-500', bg: 'bg-pink-50', desc: 'Dedicated women\'s health services, maternity, and compassionate care.' }
            ].map((specialty, i) => (
              <div key={i} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group cursor-pointer">
                <div className={`w-16 h-16 rounded-xl ${specialty.bg} ${specialty.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`bi ${specialty.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{specialty.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{specialty.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Journey/How it Works */}
        <section className="py-24 bg-blue-600 text-white mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Your Path to Better Health</h2>
            <p className="text-blue-100 mb-20 text-lg max-w-2xl mx-auto">Accessing premium healthcare has never been more straightforward. Follow these simple steps.</p>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* CORRECTED LINE: Changed top-12 to top-[72px] for exact vertical centering */}
              <div className="hidden md:block absolute top-[72px] left-[15%] right-[15%] h-0.5 bg-blue-400/50 z-0"></div>
              
              {[ 
                { icon: 'bi-search', title: "1. Find a Specialist", desc: "Browse our directory of board-certified medical professionals." }, 
                { icon: 'bi-calendar-check', title: "2. Book an Appointment", desc: "Select a convenient time slot that fits your personal schedule." }, 
                { icon: 'bi-heart-pulse', title: "3. Receive Expert Care", desc: "Get top-tier medical attention and secure access to your records." } 
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center p-6 rounded-2xl hover:bg-blue-500/40 transition-all duration-300 group cursor-pointer hover:-translate-y-2">
                  <div className="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center mb-6 text-4xl shadow-xl ring-8 ring-blue-500/30 group-hover:ring-blue-300/60 group-hover:scale-110 transition-all duration-300">
                    <i className={`bi ${step.icon}`}></i>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-blue-100 group-hover:text-white transition-colors leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Hospital Leadership / Visionaries */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Visionaries</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">The Minds Behind the Medicine</h2>
              <p className="text-gray-500 text-lg">Meet the pioneering deans and founders who built this institution on the pillars of compassion, innovation, and absolute medical excellence.</p>
            </div>
            <Link to="/about" className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
              Read Our History <i className="bi bi-arrow-right ms-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visionaries.map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="h-64 overflow-hidden bg-gray-200 relative">
                  <img src={doc.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={doc.name} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{doc.vision}</p>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-2xl text-gray-900 mb-1">{doc.name}</h3>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-4">{doc.specialty}</p>
                    
                    <div className="space-y-2 mb-6">
                      <p className="text-gray-600 text-sm flex items-center">
                        <i className="bi bi-award text-blue-500 mr-3 text-lg"></i> {doc.credential}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center">
                        <i className="bi bi-clock-history text-blue-500 mr-3 text-lg"></i> {doc.exp}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedDoctor(doc)} 
                      className="w-full py-2 rounded-lg bg-gray-50 text-gray-700 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                    >
                      Read Full Biography
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-12 text-gray-900">Patient Perspectives</h2>
            <div className="bg-slate-50 p-10 md:p-14 rounded-3xl relative">
              <i className="bi bi-quote text-6xl text-blue-200 absolute top-4 left-6"></i>
              <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-8 relative z-10 italic">
                "The level of care and professionalism exceeded all my expectations. From seamlessly booking the appointment online to the attentive follow-up care, the entire process was reassuring and world-class."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  R
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">Robert Anderson</div>
                  <div className="text-gray-500 text-sm">Cardiac Patient</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Enhanced CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600"></div>
          
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-semibold tracking-widest mb-6 uppercase">
              Here For You 24/7
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
              Ready to Prioritize Your Health?
            </h2>
            <p className="text-blue-100 mb-10 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Whether you need a routine check-up, specialized care, or immediate medical attention, our world-class team is ready to serve you today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link to="/Doctors" className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center">
                Book an Appointment
              </Link>
            </div>
          </div>
        </section>

        <Footer/>

        {/* Biography Modal Popup */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setSelectedDoctor(null)}
            ></div>
            
            <div className="relative bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 transform transition-all">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-gray-800 hover:bg-black/20 hover:text-black transition-colors z-20"
                aria-label="Close modal"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
                <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0">
                  <img 
                    src={selectedDoctor.img} 
                    alt={selectedDoctor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{selectedDoctor.name}</h3>
                  <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-6">{selectedDoctor.specialty}</p>
                  
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-700 text-sm flex items-start">
                      <i className="bi bi-award-fill text-blue-500 mr-3 text-lg mt-0.5"></i> 
                      <span><strong className="block text-gray-900 mb-1">Credentials</strong> {selectedDoctor.credential}</span>
                    </p>
                    <p className="text-gray-700 text-sm flex items-start">
                      <i className="bi bi-clock-fill text-blue-500 mr-3 text-lg mt-0.5"></i> 
                      <span><strong className="block text-gray-900 mb-1">Experience</strong> {selectedDoctor.exp}</span>
                    </p>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-gray-900 font-bold mb-3 text-lg">About</h4>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {selectedDoctor.fullBio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;