import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';
import hero from "../assets/images/servicehero.avif"
import img1 from "../assets/images/client1.avif"
import img2 from "../assets/images/client2.avif"
import img3 from "../assets/images/client3.avif"
const servicesList = [
  { 
    id: 1, 
    title: "General Medicine", 
    icon: "bi-clipboard2-pulse", 
    description: "Comprehensive primary care, focusing on prevention, accurate diagnosis, and holistic treatment for adult diseases and overall wellness.", 
    color: "from-blue-500 to-cyan-500", 
    shadow: "shadow-blue-500/30" 
  },
  { 
    id: 2, 
    title: "Cardiology", 
    icon: "bi-heart-pulse", 
    description: "State-of-the-art diagnostics and therapeutic treatments for optimal heart health, managing complex cardiovascular conditions.", 
    color: "from-rose-500 to-red-600", 
    shadow: "shadow-red-500/30" 
  },
  { 
    id: 3, 
    title: "Neurology", 
    icon: "bi-activity", 
    description: "Expert diagnostic and therapeutic care for intricate nervous system disorders, brain health, and spinal cord conditions.", 
    color: "from-purple-500 to-indigo-600", 
    shadow: "shadow-purple-500/30" 
  },
  { 
    id: 4, 
    title: "Dermatology", 
    icon: "bi-droplet-half", 
    description: "Advanced medical, surgical, and cosmetic skin care solutions tailored to maintain, treat, and restore your skin's health.", 
    color: "from-amber-400 to-orange-500", 
    shadow: "shadow-orange-500/30" 
  },
  { 
    id: 5, 
    title: "Gynecology", 
    icon: "bi-gender-female", 
    description: "Dedicated women's health services providing compassionate maternity care, reproductive health, and proactive wellness.", 
    color: "from-pink-500 to-rose-500", 
    shadow: "shadow-pink-500/30" 
  }
];

// Mock Data for Testimonials
const testimonials = [
  {
    id: 1,
    name: "Michael Thompson",
    service: "Cardiology Patient",
    review: "The level of care I received was outstanding. The booking process was entirely seamless, and Dr. Smith took the time to explain everything clearly. Highly recommend!",
    rating: 5,
    image: img1
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    service: "Dermatology Patient",
    review: "I had struggled with a skin condition for years. The dermatology team here didn't just treat the symptoms, they found the root cause. I finally have my confidence back.",
    rating: 5,
    image: img2
  },
  {
    id: 3,
    name: "David Chen",
    service: "Neurology Patient",
    review: "Dealing with chronic migraines was exhausting. The neurology department utilized advanced diagnostics to build a custom treatment plan that has completely changed my life.",
    rating: 5,
    image: img3
  }
];

const Service = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* ================= 1. ENHANCED HERO HEADER WITH BG IMAGE ================= */}
      <section 
        className="relative text-white pt-28 pb-24 sm:pt-36 sm:pb-32 px-4 text-center overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[5rem] shadow-2xl bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* Dark Overlays (Lightened slightly to show more image) */}
        <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Centers of Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tight leading-[1.15] drop-shadow-lg">
            Comprehensive Care <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 drop-shadow-none">For Your Entire Family</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto font-medium px-4 drop-shadow-md">
            From routine checkups to highly specialized treatments, our state-of-the-art clinic offers a wide spectrum of medical departments tailored to your unique health needs.
          </p>
        </div>
      </section>

      {/* ================= 2. ENHANCED SERVICES GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full relative z-20 -mt-10 sm:-mt-16">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col group relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-blue-50/50 z-0"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 bg-gradient-to-br ${service.color} ${service.shadow} shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  <i className={`bi ${service.icon} text-2xl sm:text-3xl text-white`}></i>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{service.title}</h3>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8 flex-grow font-medium">
                  {service.description}
                </p>
                
                <Link to="/doctors" className="inline-flex items-center text-blue-600 font-bold group/link mt-auto w-max text-xs sm:text-sm uppercase tracking-wide">
                  Find Specialists 
                  <i className="bi bi-arrow-right ml-2 transform group-hover/link:translate-x-2 transition-transform"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. ENHANCED HOW IT WORKS ================= */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6">Your Path to Healing</h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium px-4">Booking an appointment has never been this simple. Skip the waiting room lines and secure your premium care digitally.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 sm:gap-16 relative">
            {/* Dashed Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-0.5 border-t-2 border-dashed border-blue-200 z-0"></div>
            
            {[
              { step: "01", icon: "bi-hospital", title: "Select a Department", desc: "Choose the medical department or specific specialty that fits your current health concern." },
              { step: "02", icon: "bi-person-badge", title: "Choose a Doctor", desc: "Browse through our verified specialists, read their credentials, and pick your preferred doctor." },
              { step: "03", icon: "bi-calendar2-check", title: "Book & Confirm", desc: "Select an available time slot, confirm your details, and receive instant booking approval." }
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-4 border-blue-50 rounded-full flex flex-col items-center justify-center mb-4 sm:mb-6 shadow-[0_10px_30px_rgba(59,130,246,0.15)] group-hover:border-blue-100 group-hover:-translate-y-2 transition-all duration-300 relative">
                  <span className="text-blue-600 text-2xl sm:text-3xl"><i className={`bi ${item.icon}`}></i></span>
                  <div className="absolute -bottom-3 sm:-bottom-4 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-md">
                    STEP {item.step}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 mt-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed px-2 sm:px-4 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. ENHANCED TESTIMONIALS ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block flex items-center justify-center gap-2">
              <span className="w-6 sm:w-8 h-0.5 bg-blue-600 inline-block"></span> Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6">Patient Perspectives</h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium px-4">Don't just take our word for it. Here is what people are saying about their experience with our specialized departments.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 sm:p-8 lg:p-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 relative flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
                {/* Large Background Quote Icon */}
                <i className="bi bi-quote absolute top-4 sm:top-6 right-6 sm:right-8 text-5xl sm:text-7xl text-blue-50 pointer-events-none font-serif"></i>
                
                {/* Star Ratings */}
                <div className="flex text-amber-400 mb-4 sm:mb-6 relative z-10 gap-1 text-base sm:text-lg">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`bi ${i < testimonial.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-8 sm:mb-10 relative z-10 flex-grow font-medium">
                  "{testimonial.review}"
                </p>
                
                {/* Patient Profile Picture & Details */}
                <div className="border-t border-slate-100 pt-5 sm:pt-6 mt-auto flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md flex-shrink-0"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <i className="bi bi-check text-white text-[10px] sm:text-xs"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">{testimonial.name}</h4>
                    <p className="text-[10px] sm:text-xs text-blue-600 font-bold uppercase tracking-wide mt-0.5 sm:mt-1">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. ENHANCED CTA ================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Mesh Gradients */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/40 rounded-full blur-[80px] sm:blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-indigo-600/40 rounded-full blur-[80px] sm:blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tight">Not sure which department?</h2>
              <p className="text-sm sm:text-base md:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Our General Medicine physicians are a perfect starting point. They can evaluate your symptoms and seamlessly refer you to the correct specialist.
              </p>
              <Link to="/doctors" className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                Consult a General Physician <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Service;