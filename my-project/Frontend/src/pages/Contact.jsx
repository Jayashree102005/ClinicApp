import React from "react";
import { Link } from 'react-router-dom';
import Footer from "../component/Footer";
import hero from "../assets/images/contacthero.webp"
const Contact = () => {
  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative min-h-[65vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-slate-900/60"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-300/30 text-sm uppercase tracking-widest mb-6">
            Contact & Support
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6">
            We're Here To Help
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Reach out to our healthcare team for appointments, medical
            assistance, and emergency support whenever you need us.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-5">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <h3 className="text-xl font-bold mb-3">Address</h3>

              <p className="text-gray-600 leading-relaxed">
                123 Medical Avenue,
                <br />
                Bangalore
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-5">
                <i className="bi bi-telephone-fill"></i>
              </div>

              <h3 className="text-xl font-bold mb-3">Call Us</h3>

              <p className="text-gray-600 leading-relaxed">
                +1 (555) 123-4567
                <br />
                +1 (333) 123-4567
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl mb-5">
                <i className="bi bi-envelope-fill"></i>
              </div>

              <h3 className="text-xl font-bold mb-3">Email</h3>

              <p className="text-gray-600 leading-relaxed">
                info@clinicapp.com
                <br />
                support@clinicapp.com
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center text-3xl mb-5">
                <i className="bi bi-clock-fill"></i>
              </div>

              <h3 className="text-xl font-bold mb-3">Working Hours</h3>

              <p className="text-gray-600 leading-relaxed">
                Monday - Saturday
                <br />
                8:00 AM - 9:00 PM
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold uppercase tracking-wider">
              Find Us
            </span>

            <h2 className="text-4xl font-extrabold mt-2 mb-4">
              Visit Our Hospital
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto">
              Conveniently located with easy access and ample parking for
              patients and visitors.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-2xl h-[300px] sm:h-[400px] lg:h-[550px]">
            <iframe
              title="Hospital Location"
              src="https://maps.google.com/maps?q=bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Your Health Is Our Priority
          </h2>

          <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-10">
            Schedule an appointment with our experienced specialists and receive
            world-class healthcare tailored to your needs.
          </p>

          <a
            href="/doctors"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all"
          >
            Book Appointment
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;