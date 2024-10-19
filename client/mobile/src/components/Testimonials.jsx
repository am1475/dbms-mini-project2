import React, { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'Quick and easy.',
      image: 'https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728747847/john-doe-md-san-francisco-ca_zpkasa.jpg', // Placeholder image URL
    },
    {
      name: 'Jane Smith',
      feedback: 'Fast support.',
      image: 'https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728748145/speaker-1_smbvhg.jpg', // Placeholder image URL
    },
    {
      name: 'Michael Johnson',
      feedback: 'User-friendly interface!',
      image: 'https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728748188/cannes-france-june-22-2023-michael-johnson-atlanta-96-olympics-four-olympic-gold-medals-and-nine-world-championship-gold-medals-attended-on-stage-during-the-power-of-the-athletes-voice-session-at-the-cannes-lions-2023-ifnm-press-2R8MY37_oa1fhv.jpg', // Placeholder image URL
    },
    {
      name: 'Emily Davis',
      feedback: 'Great customer service.',
      image: 'https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728748253/cmu_fall2020_028_egowzo.jpg', // Placeholder image URL
    },
    {
      name: 'Chris Brown',
      feedback: 'Highly recommended service!',
      image: 'https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728748282/chris-brown-2-061324-de83a75d22664ecc86b84b4785e5a695_wge7xj.jpg', // Placeholder image URL
    },
    {
      name: 'Sarah Wilson',
      feedback: 'Reliable and efficient.',
      image: 'https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728748317/Sarah-Willson_1_yl3wdi.jpg', // Placeholder image URL
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">What Our Customers Say</h2>
        <div className="flex justify-center items-center">
          <button 
            onClick={handlePrev} 
            className="bg-blue-500 text-white rounded-full p-2 mx-2 disabled:opacity-50" 
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <div className="flex overflow-hidden">
            <div className="flex space-x-4 transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 250}px)` }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center min-w-[250px] flex-shrink-0"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 mx-auto rounded-full mb-4" // Rounded image
                  />
                  <p className="text-gray-600 mb-2">{testimonial.feedback}</p>
                  <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={handleNext} 
            className="bg-blue-500 text-white rounded-full p-2 mx-2 disabled:opacity-50" 
            disabled={currentIndex === testimonials.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
