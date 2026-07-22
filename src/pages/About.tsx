import { Heart, Shield, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      desc: 'We prioritize the physical and emotional safety of every resident with 24/7 security, strict visitor policies, and secure premises.'
    },
    {
      icon: Heart,
      title: 'Comfort & Care',
      desc: 'Our accommodations are designed to feel like home. We ensure cleanliness, high-quality meals, and prompt maintenance.'
    },
    {
      icon: Users,
      title: 'Vibrant Community',
      desc: 'We foster a supportive environment where residents can connect, network, and build friendships that last a lifetime.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-violet-900 py-16 md:py-24 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6"
        >
          About Radhe Shyam PG
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto"
        >
          Providing a safe, comfortable, and inspiring living space in the heart of Vadodara for both girls and boys.
        </motion.p>
      </div>

      {/* Story Section */}
      <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-violet-900 mb-4 md:mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              RadheShyam PG is one of the best PG in Vadodara, offering safe, clean, and affordable accommodation in the prime location of Akota, Vadodara. We provide separate PG for Girls and PG for Boys with fully furnished rooms, making us an ideal choice for students, interns, and working professionals looking for a comfortable stay.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Our facilities include high-speed Wi-Fi, RO drinking water, CCTV security, housekeeping, washing machine, refrigerator, geyser, power backup, and spacious, well-maintained rooms. Conveniently located near MS University, Vadodara Railway Station, offices, coaching institutes, restaurants, and shopping areas, RadheShyam PG offers excellent connectivity across the city.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you are searching for a PG in Alkapuri, Girls PG in Vadodara, Boys PG in Alkapuri, PG near MS University Vadodara, PG near Vadodara Railway Station, Affordable PG in Vadodara, or Fully Furnished PG in Vadodara, RadheShyam PG provides a secure, hygienic, and home-like living experience with quality service at a reasonable price. Choose RadheShyam PG for a peaceful, comfortable, and reliable stay in the heart of Alkapuri, Vadodara.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://iili.io/CNuyUxt.png" 
              alt="Community of students and professionals" 
              className="rounded-2xl shadow-xl object-cover h-[400px] sm:h-[500px] w-full"
            />
            <div className="absolute inset-0 bg-fuchsia-500/10 rounded-2xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-violet-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-fuchsia-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-500">
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
