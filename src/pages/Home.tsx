import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Wifi, ShieldCheck, Droplets, Wind, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    'https://iili.io/CNTshBV.png',
    'https://iili.io/CNTQw5F.png',
    'https://iili.io/CNTt9GR.png',
    'https://iili.io/CNTbJet.png',
    'https://iili.io/CNTpm1j.png',
    'https://iili.io/CNuHfUv.png',
    'https://iili.io/CNuJs3b.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const amenities = [
    { icon: Wind, title: 'Air Conditioned Rooms', desc: 'Comfortable air-conditioned spaces' },
    { icon: Wifi, title: 'High-Speed Wi-Fi', desc: 'Seamless internet for work & study' },
    { icon: ShieldCheck, title: '24×7 Security', desc: 'CCTV surveillance & guarded premises' },
    { icon: Droplets, title: 'RO Drinking Water', desc: 'Clean & safe drinking water 24/7' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Student', text: 'The safest and most comfortable PG in Akota. The food feels like home!', rating: 5 },
    { name: 'Anjali Patel', role: 'Working Professional', text: 'Excellent Wi-Fi and very clean rooms. Management is highly responsive.', rating: 5 },
    { name: 'Riya Desai', role: 'Student', text: 'Love the community here. The AC rooms are spacious and well-maintained.', rating: 4 },
  ];

  const galleryImagesRow1 = [
    'https://iili.io/CNTshBV.png',
    'https://iili.io/CNTQw5F.png',
    'https://iili.io/CNTt9GR.png',
    'https://iili.io/CNTbJet.png',
    'https://iili.io/CNTpm1j.png',
  ];
  const galleryImagesRow2 = [
    'https://iili.io/CNuHfUv.png',
    'https://iili.io/CNuJs3b.png',
    'https://iili.io/CNTshBV.png',
    'https://iili.io/CNTQw5F.png',
    'https://iili.io/CNTt9GR.png',
  ];
  const galleryImagesRow3 = [
    'https://iili.io/CNTbJet.png',
    'https://iili.io/CNTpm1j.png',
    'https://iili.io/CNuHfUv.png',
    'https://iili.io/CNuJs3b.png',
    'https://iili.io/CNTshBV.png',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full aspect-video flex items-center justify-center overflow-hidden bg-violet-900">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt="Premium Room"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentHeroImage ? 1 : 0 }}
              transition={{ duration: 1 }}
            />
          ))}
          <div className="absolute inset-0 bg-violet-900/40 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
        </div>
        
        <div className="relative z-10 text-center px-2 sm:px-4 max-w-4xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[5vw] sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-1 sm:mb-4 drop-shadow-2xl leading-tight"
          >
            Premium Living for <span className="text-fuchsia-400 drop-shadow-lg">Students & Professionals</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[2.5vw] sm:text-base md:text-xl text-gray-100 mb-2 sm:mb-8 max-w-2xl mx-auto drop-shadow-xl px-2 leading-snug font-medium"
          >
            Experience safety, comfort, and community at Vadodara's most trusted Paying Guest accommodation for Girls & Boys.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/contact"
              className="inline-flex items-center px-3 py-1.5 sm:px-8 sm:py-4 text-[2.5vw] sm:text-lg font-medium text-white bg-fuchsia-500 rounded-full hover:bg-fuchsia-600 transition-colors shadow-xl hover:shadow-fuchsia-500/30"
            >
              Book a Visit <ArrowRight className="ml-1 sm:ml-2 w-[3vw] h-[3vw] sm:h-5 sm:w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Auto-scrolling Gallery */}
      <section className="py-12 sm:py-20 bg-gray-900 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">A Glimpse of Radhe Shyam PG</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">Experience our beautifully designed spaces through our gallery.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-4 sm:gap-6"
        >
          {/* Row 1: Left */}
          <div className="flex gap-4 sm:gap-6 w-max animate-scroll-left">
             {[...galleryImagesRow1, ...galleryImagesRow1].map((img, i) => (
               <div key={`r1-${i}`} className="w-48 sm:w-72 h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-lg">
                 <img src={img} alt="Gallery image" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          {/* Row 2: Right */}
          <div className="flex gap-4 sm:gap-6 w-max animate-scroll-right">
             {[...galleryImagesRow2, ...galleryImagesRow2].map((img, i) => (
               <div key={`r2-${i}`} className="w-48 sm:w-72 h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-lg">
                 <img src={img} alt="Gallery image" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          {/* Row 3: Left */}
          <div className="flex gap-4 sm:gap-6 w-max animate-scroll-left">
             {[...galleryImagesRow3, ...galleryImagesRow3].map((img, i) => (
               <div key={`r3-${i}`} className="w-48 sm:w-72 h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-lg">
                 <img src={img} alt="Gallery image" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Amenities Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-violet-900 mb-4">Premium Amenities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for a comfortable and hassle-free stay.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-fuchsia-500/5 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto bg-fuchsia-100 rounded-full flex items-center justify-center mb-6 text-fuchsia-500">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Pricing Plans */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-violet-900 mb-4">Our Pricing Plans</h2>
            <div className="w-24 h-1 bg-fuchsia-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the perfect room that fits your needs and budget. Fully furnished and ready to move in.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Single Room */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Single Room</h3>
                <p className="text-gray-500 text-sm">Ultimate privacy & comfort</p>
              </div>
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-violet-900">₹9,000</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> Personal AC & Geyser</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> High-speed Wi-Fi</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> Daily Housekeeping</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> Nutritious Meals</li>
              </ul>
              <Link to="/contact" className="block w-full py-3 px-6 text-center text-violet-900 font-semibold bg-violet-50 hover:bg-violet-100 rounded-xl transition-colors">Book Now</Link>
            </motion.div>

            {/* Double Sharing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-violet-900 rounded-3xl p-8 border border-violet-800 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden transform md:-translate-y-4"
            >
              <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Double Sharing</h3>
                <p className="text-violet-200 text-sm">Perfect balance of social & private</p>
              </div>
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-white">₹7,500</span>
                <span className="text-violet-200">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-violet-100">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-400 mr-3 shrink-0" /> Shared AC & Geyser</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-400 mr-3 shrink-0" /> High-speed Wi-Fi</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-400 mr-3 shrink-0" /> Daily Housekeeping</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-400 mr-3 shrink-0" /> Nutritious Meals</li>
              </ul>
              <Link to="/contact" className="block w-full py-3 px-6 text-center text-white font-semibold bg-fuchsia-500 hover:bg-fuchsia-600 rounded-xl transition-colors shadow-lg hover:shadow-fuchsia-500/30">Book Now</Link>
            </motion.div>

            {/* Triple Sharing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Triple Sharing</h3>
                <p className="text-gray-500 text-sm">Highly affordable & fun</p>
              </div>
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-violet-900">₹6,000</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> Shared AC & Geyser</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> High-speed Wi-Fi</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> Daily Housekeeping</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-fuchsia-500 mr-3 shrink-0" /> Nutritious Meals</li>
              </ul>
              <Link to="/contact" className="block w-full py-3 px-6 text-center text-violet-900 font-semibold bg-violet-50 hover:bg-violet-100 rounded-xl transition-colors">Book Now</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brief About Us */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <img 
                src="https://iili.io/CNuHfUv.png" 
                alt="PG Interior" 
                className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-500">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Trusted by</p>
                    <p className="text-2xl font-bold text-violet-900">500+ Residents</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-4xl font-serif font-bold text-violet-900 mb-6">A Home Away From Home</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Radhe Shyam PG, we understand that moving away from home can be daunting. That's why we've created a nurturing, secure, and vibrant environment specifically tailored for students and professionals in Vadodara.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our facilities are designed to provide the perfect balance of privacy for focused work or study, and common areas for building lifelong friendships.
              </p>
              <Link to="/about" className="text-fuchsia-500 font-medium hover:text-fuchsia-600 inline-flex items-center">
                Learn more about our mission <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-violet-900 mb-4">What Our Residents Say</h2>
            <div className="w-24 h-1 bg-fuchsia-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-fuchsia-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-violet-900 mb-4">Find Us Here</h2>
            <div className="w-24 h-1 bg-fuchsia-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Visit our premium accommodation in the heart of Vadodara.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative h-[300px] sm:h-[450px]"
          >
            <a 
              href="https://www.google.com/maps/place/Radhe+Shyam+Pg/data=!4m2!3m1!1s0x0:0xf331343bedc97d9b?sa=X&ved=1t:2428&hl=en-US&ictx=111" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 z-10" 
              aria-label="Open in Google Maps"
            ></a>
            <iframe 
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Silver%20Square,%20apartments,%20Shree%20Nagar%20Society,%20Akota,%20Vadodara+(Radhe%20Shyam%20PG)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0 pointer-events-none"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
