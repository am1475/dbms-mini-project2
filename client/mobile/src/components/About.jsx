import React from 'react';

const About = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">About Our Recharge Service</h2>
        
        <p className="text-xl text-center mb-6 text-gray-700">
          Discover what makes our mobile recharge platform unique and reliable.
        </p>

        <div className="flex flex-wrap justify-center space-x-4 space-y-4">
          {/* Unique Feature 1 */}
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg w-[400px] transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-2">User-Friendly Interface</h3>
            <p className="text-base">
              Our intuitive design ensures a quick and easy recharge process.
            </p>
          </div>

          {/* Unique Feature 2 */}
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg w-[400px] transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-base">
              We protect your personal and payment information with advanced security.
            </p>
          </div>

          {/* Unique Feature 3 */}
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg w-[400px] transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-2">24/7 Customer Support</h3>
            <p className="text-base">
              Our dedicated team is available around the clock to assist you.
            </p>
          </div>
        </div>

        <p className="text-xl text-center mt-10 text-gray-700">
          Join us today for a seamless recharge experience!
        </p>
      </div>
    </section>
  );
};

export default About;
