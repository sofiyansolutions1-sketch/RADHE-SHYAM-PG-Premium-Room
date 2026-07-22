import { Wind, Refrigerator, WashingMachine, Droplets, Flame, Wifi, ShieldCheck, Utensils, Bed, Key, Bath, Zap, Sparkles, Heart, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

export default function Facilities() {
  const facilities = [
    { icon: Wind, title: 'Air Conditioned Rooms', desc: 'Comfortable and fully air-conditioned living spaces' },
    { icon: Refrigerator, title: 'Refrigerator', desc: 'Shared refrigerator for your groceries and beverages' },
    { icon: WashingMachine, title: 'Fully Automatic Washing Machine', desc: 'Hassle-free laundry with automatic machines' },
    { icon: Droplets, title: 'RO Drinking Water', desc: 'Clean, safe, and purified drinking water available 24/7' },
    { icon: Flame, title: '24×7 Hot Water', desc: 'Geyser facility for hot water access anytime' },
    { icon: Wifi, title: 'High-Speed Wi-Fi', desc: 'Seamless internet connectivity for all your needs' },
    { icon: ShieldCheck, title: '24×7 CCTV Security', desc: 'Round-the-clock surveillance for complete peace of mind' },
    { icon: Utensils, title: 'Modern Modular Kitchen', desc: 'Well-equipped kitchen for your culinary needs' },
    { icon: Coffee, title: 'Gas Stove Facility', desc: 'Access to gas stove for quick meals and tea/coffee' },
    { icon: Bed, title: 'Comfortable Personal Bed', desc: 'Quality mattress and cozy bed for a restful sleep' },
    { icon: Key, title: 'Individual Locker', desc: 'Secure space for your personal belongings' },
    { icon: Bath, title: 'Attached Bathroom & Balcony', desc: 'Private spaces for your convenience and relaxation' },
    { icon: Zap, title: 'Electricity Included', desc: 'Basic electricity covered (AC charged separately)' },
    { icon: Sparkles, title: 'Daily Housekeeping', desc: 'Regular cleaning to maintain a pristine environment' },
    { icon: Heart, title: 'Peaceful Environment', desc: 'A safe, friendly, and community-driven atmosphere' },
  ];

  return (
    <div className="bg-gray-50 pb-16 md:pb-20">
      {/* Header */}
      <div className="bg-violet-900 py-16 md:py-24 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6"
        >
          Premium Facilities
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto"
        >
          We've thoughtfully curated every amenity to ensure your stay is comfortable, productive, and hassle-free.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] md:mt-[-3rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((fac, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-fuchsia-200 hover:shadow-fuchsia-500/10 transition-all group"
            >
              <div className="w-14 h-14 bg-fuchsia-50 rounded-xl flex items-center justify-center mb-6 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                <fac.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{fac.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{fac.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
