import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Fast Recharge',
      description: 'Experience lightning-fast recharge processing with our optimized system.',
      icon: '⚡', // Placeholder for an icon
    },
    {
      title: 'Secure Payment',
      description: 'All transactions are protected with the highest security standards.',
      icon: '🔒', // Placeholder for an icon
    },
    {
      title: '24/7 Support',
      description: 'Our customer support is available 24/7 to assist with any queries.',
      icon: '🕒', // Placeholder for an icon
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-center"
            >
              {/* Feature Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>
              {/* Feature Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              {/* Feature Description */}
              <p className="text-gray-600 mb-6">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
