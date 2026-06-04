import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';
import hero1 from "../assets/images/abouthero1.avif"
import hero2 from "../assets/images/abouthero2.avif"
import img1 from "../assets/images/abimg.jpg"
const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* ================= 1. ENHANCED HERO BANNER ================= */}
      <section className="relative pt-12 pb-16  lg:pb-40 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1000px] h-[300px] sm:h-[500px] opacity-20 bg-blue-400 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <div className="lg:col-span-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                Discover NovaCare
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                The Standard of <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                  Modern Medicine.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                NovaCare bridges the gap between revolutionary medical technology and deeply personalized patient care. We don't just treat symptoms; we cultivate long-term clinical excellence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/doctors" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-1 text-center">
                  Book an Appointment
                </Link>
                <a href="#timeline" className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold shadow-sm hover:shadow-md transition-all text-center">
                  Our Journey
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[350px] sm:h-[500px] lg:h-[600px] w-full mt-8 lg:mt-0">
              <div className="absolute -right-4 sm:-right-8 -top-4 sm:-top-8 w-48 sm:w-64 h-48 sm:h-64 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:20px_20px] opacity-60"></div>

              <div className="absolute top-0 right-0 w-[75%] sm:w-[70%] h-[75%] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white group z-0 transform hover:rotate-1 transition-transform duration-700">
                <img
                  src={hero1}
                  alt="Advanced Diagnostics"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-60"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-[65%] sm:w-[60%] h-[60%] rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white z-10 group transform hover:-rotate-1 transition-transform duration-700">
                <img
                  src={hero2}
                  alt="Patient Focused Care"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. REDESIGNED MISSION & VISION SECTION ================= */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-slate-50 lg:rounded-l-[100px] z-0"></div>
        <div className="absolute top-20 right-10 lg:right-20 w-48 lg:w-72 h-48 lg:h-72 bg-blue-100/50 rounded-full blur-3xl z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block flex items-center gap-2">
                <span className="w-6 sm:w-8 h-0.5 bg-blue-600 inline-block"></span> Our Purpose
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Driven by Compassion.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Defined by Excellence.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                Healthcare is more than treating conditions; it is about restoring hope, confidence, and quality of life. We believe that every patient deserves access to elite medical minds, state-of-the-art facilities, and a deeply empathetic support system.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 text-slate-800 font-bold text-sm sm:text-base">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg sm:text-xl">
                  <i className="bi bi-heart-pulse-fill"></i>
                </div>
                Healing happens here.
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Vision Card */}
              <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-white relative overflow-hidden group transform hover:-translate-y-2 transition-all duration-500">
                <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-blue-500 group-hover:w-3 transition-all duration-300"></div>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm">
                    <i className="bi bi-eye-fill"></i>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">Our Vision</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      To redefine the global standard of healthcare by seamlessly integrating breakthrough medical technology with unwavering, human-centric patient care, ensuring no community is left behind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-white relative overflow-hidden group transform hover:-translate-y-2 transition-all duration-500 lg:ml-12 lg:mt-8">
                <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-indigo-500 group-hover:w-3 transition-all duration-300"></div>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-indigo-50 text-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">Our Mission</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      To provide accessible, world-class medical treatments while fostering a secure, innovative, and deeply compassionate healing environment for every individual who walks through our doors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. OUR STORY SECTION ================= */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative order-2 md:order-1 mt-8 md:mt-0">
            <div className="absolute -left-4 sm:-left-6 -top-4 sm:-top-6 w-full h-full border-2 border-blue-100 rounded-2xl sm:rounded-3xl z-0"></div>
            <img
              src={img1}
              alt="Medical team discussing"
              className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl object-cover h-[350px] sm:h-[500px] w-full relative z-10"
            />
            <div className="hidden lg:block absolute -bottom-6 -right-4 bg-blue-600 text-white p-6 rounded-2xl shadow-xl border-4 border-white z-20 hover:-translate-y-2 transition-transform">
              <div className="text-4xl font-black">20+</div>
              <div className="text-sm font-medium mt-1 text-blue-100 uppercase tracking-wide">
                Years of<br />Excellence
              </div>
            </div>
            <div className="hidden lg:block absolute top-6 -left-4 sm:top-12 sm:-left-8 bg-white text-slate-900 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 z-20 hover:-translate-y-2 transition-transform">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-green-500 bg-green-100 p-1.5 sm:p-2 rounded-full"><i className="bi bi-graph-up-arrow text-sm sm:text-base"></i></div>
                <div>
                  <div className="text-lg sm:text-xl font-black">100k+</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Patients Healed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 order-1 md:order-2">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block flex items-center gap-2">
              <span className="w-6 sm:w-8 h-0.5 bg-blue-600 inline-block"></span> Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 leading-[1.15]">
              A Legacy of Care, <br /> Powered by <span className="text-blue-600">Innovation.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6 font-medium">
              Founded in 2005, our infrastructure began with a straightforward conviction: that accessing premium healthcare shouldn't be governed by exhausting wait times or fragmented medical filing cabinets.
            </p>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8 sm:mb-10">
              Today, we have matured into a highly secure, integrated healthcare operation. Whether handling complicated cardiovascular screenings or scaling regional telehealth channels, we emphasize surgical safety and clinical accuracy above all else.
            </p>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 sm:mb-2">50+</div>
                <div className="text-blue-600 font-bold text-xs sm:text-sm tracking-wide uppercase">Expert Specialists</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 sm:mb-2">98%</div>
                <div className="text-blue-600 font-bold text-xs sm:text-sm tracking-wide uppercase">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. REDESIGNED HISTORY TIMELINE ================= */}
      <section id="timeline" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Milestones of Progress</h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">Tracing our evolution from a singular clinic to a global standard of care.</p>
          </div>

          <div className="relative">
            {/* The continuous vertical line (Responsive positioning) */}
            <div className="absolute top-0 bottom-0 left-[16px] sm:left-[140px] w-1 bg-slate-200 rounded-full z-0"></div>

            {/* Timeline Items */}
            {[
              { year: '2005', title: 'The Foundation', icon: 'bi-building', desc: 'We opened our doors with a core team of cardiovascular experts and a rigid commitment to patient-first, transparent care.' },
              { year: '2012', title: 'Technological Leap', icon: 'bi-cpu', desc: 'Integrated advanced robotic surgery and AI-assisted diagnostic tools into our daily operations, revolutionizing surgical recovery times.' },
              { year: '2019', title: 'Digital Transformation', icon: 'bi-cloud-check', desc: 'Launched our secure telehealth portal and end-to-end encrypted databases, bringing world-class consultations to patients globally.' },
              { year: '2026', title: 'Global Recognition', icon: 'bi-globe-americas', desc: 'Awarded the International Benchmark for Medical Safety, officially expanding our centers of excellence across multiple disciplines.' }
            ].map((item, index) => (
              <div key={index} className="relative pl-14 sm:pl-[190px] py-6 sm:py-8 group">

                {/* Year Label (Desktop) */}
                <div className="hidden sm:block absolute top-12 left-0 w-[100px] text-right font-black text-2xl text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
                  {item.year}
                </div>

                {/* Timeline Node / Icon */}
                <div className="absolute top-6 sm:top-10 left-0 sm:left-[124px] w-9 h-9 bg-white border-4 border-slate-200 group-hover:border-blue-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10 group-hover:scale-110">
                  <i className={`bi ${item.icon} text-slate-400 group-hover:text-blue-600 text-sm transition-colors`}></i>
                </div>

                {/* Content Card */}
                <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-300 transform group-hover:-translate-y-1 relative">
                  {/* Small arrow pointing left to the node (Desktop only) */}
                  <div className="hidden sm:block absolute top-11 -left-2 w-4 h-4 bg-white border-l border-b border-slate-100 group-hover:border-blue-100 transform rotate-45 transition-colors duration-300"></div>

                  {/* Year Label (Mobile only) */}
                  <div className="sm:hidden font-black text-xl text-blue-600 mb-2">{item.year}</div>

                  <h4 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">{item.title}</h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. CORE VALUES SECTION ================= */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">The permanent foundational principles that govern our clinical operations.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: 'bi-person-hearts', color: 'from-rose-500 to-pink-600', shadow: 'shadow-pink-500/30', title: 'Patient-First Approach', desc: 'Your physical well-being remains our permanent north star. We optimize for transparency, clinical focus, and continuous safety.' },
              { icon: 'bi-shield-check', color: 'from-blue-600 to-indigo-600', shadow: 'shadow-blue-600/30', title: 'Integrity & Security', desc: 'We operate under strict regulatory compliance protocols, ensuring medical data remains completely secure and locked down.' },
              { icon: 'bi-lightbulb', color: 'from-amber-400 to-orange-500', shadow: 'shadow-orange-500/30', title: 'Modern Adaptability', desc: 'Consistently adjusting our routing frameworks and scheduling interfaces to ensure patient access remains seamless and fast.' }
            ].map((value, i) => (
              <div key={i} className="bg-slate-50 p-6 lg:p-8 rounded-[1.5rem] lg:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-5 lg:mb-6 shadow-lg bg-gradient-to-br ${value.color} ${value.shadow} transform group-hover:rotate-6 transition-transform duration-300`}>
                  <i className={`bi ${value.icon} text-2xl lg:text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 lg:mb-4">{value.title}</h3>
                <p className="text-sm lg:text-base text-slate-600 leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. ACCREDITATIONS ================= */}
      <section className="py-10 lg:py-12 bg-slate-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-slate-200">
        <p className="text-center text-xs lg:text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 lg:mb-8">Registered Accreditations & Standards</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center text-center">
          {[
            { icon: 'bi-patch-check-fill', text: 'Joint Commission Accredited' },
            { icon: 'bi-lock-fill', text: 'HIPAA & GDPR Compliant' },
            { icon: 'bi-heart-fill', text: 'American Medical Council' },
            { icon: 'bi-shield-fill-check', text: 'ISO 27001 Certified Data' }
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-2 lg:gap-3 text-slate-400 hover:text-blue-600 transition-colors p-4 lg:p-6 rounded-2xl hover:bg-white cursor-default shadow-sm border border-transparent hover:border-slate-100">
              <i className={`text-3xl lg:text-4xl ${badge.icon} opacity-80`}></i>
              <span className="font-bold text-xs lg:text-sm tracking-tight text-slate-600">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 7. CALL TO ACTION ================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2rem] lg:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-600/40 rounded-full blur-[80px] lg:blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-indigo-600/40 rounded-full blur-[80px] lg:blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 tracking-tight">Ready to prioritize your health?</h2>
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto font-medium">
                Join thousands of individuals who depend on NovaCare for streamlined, expert medical care. Find your specialist and manage your schedule today.
              </p>
              <Link to="/doctors" className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                Find a Doctor Today <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;