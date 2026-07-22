import { MapPin, Users, Bed, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Locations() {
  const branches = [
    {
      name: "RADHE SHYAM PG – Akota - Vadodara",
      address: 'Located in Akota, with excellent connectivity to: Alkapuri - MS University - Sayajigunj - Vadodara Railway Station - Diwalipura - Jetalpur Road',
      mapUrl: 'https://www.google.com/maps/place/Radhe+Shyam+Pg/data=!4m2!3m1!1s0x0:0xf331343bedc97d9b?sa=X&ved=1t:2428&hl=en-US&ictx=111',
      capacity: 'Premium PG',
      images: [
        'https://iili.io/CNTt9GR.png',
        'https://iili.io/CNTbJet.png',
      ],
      pricing: [
        { type: 'Starting From', price: '₹4,500/mo', available: true },
        { type: '3 Sharing AC', price: '₹6,000/mo', available: true },
        { type: '2 Sharing AC', price: '₹7,500/mo', available: true },
      ]
    }
  ];

  return (
    <div className="bg-white pb-16 md:pb-20">
      {/* Header */}
      <div className="bg-violet-900 py-16 md:py-24 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6"
        >
          Our Branches
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto"
        >
          Strategically located in safe, prime areas of Vadodara with easy access to transit, colleges, and offices.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 space-y-16 md:space-y-24">
        {branches.map((branch, idx) => (
          <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12`}>
            
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: idx % 2 !== 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 space-y-4"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 sm:h-80 relative group">
                <img src={branch.images[0]} alt={`${branch.name} main`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow h-40">
                  <img src={branch.images[1]} alt={`${branch.name} secondary`} className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow h-40 bg-fuchsia-50 flex items-center justify-center relative cursor-pointer">
                   <div className="absolute inset-0 bg-violet-900/10"></div>
                   <span className="text-violet-900 font-medium z-10 flex items-center"><Users className="mr-2" /> View Gallery</span>
                </div>
              </div>
            </motion.div>

            {/* Details & Pricing */}
            <motion.div 
              initial={{ opacity: 0, x: idx % 2 !== 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 flex flex-col justify-center"
            >
              <div className="mb-2 flex items-center">
                <span className="bg-fuchsia-100 text-fuchsia-600 text-xs sm:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center">
                  <Bed className="w-4 h-4 mr-2" /> {branch.capacity}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-violet-900 mb-4">{branch.name}</h2>
              <div className="flex items-start text-gray-600 mb-6 md:mb-8">
                <MapPin className="w-5 h-5 text-fuchsia-500 mr-3 mt-1 shrink-0" />
                <p className="text-lg leading-relaxed">{branch.address}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Pricing Plans</h3>
                <div className="space-y-4">
                  {branch.pricing.map((plan, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-semibold text-gray-800">{plan.type}</p>
                        <p className={`text-sm flex items-center mt-1 ${plan.available ? 'text-green-600' : 'text-red-500'}`}>
                          {plan.available ? (
                            <><CheckCircle2 className="w-4 h-4 mr-1" /> Available</>
                          ) : (
                            <>Waitlisted</>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-violet-900">{plan.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a 
                  href={branch.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-8 py-3 w-full sm:w-auto text-base font-medium text-white bg-violet-900 rounded-xl hover:bg-violet-800 transition-colors shadow-lg hover:shadow-violet-900/30"
                >
                  <MapPin className="mr-2 h-5 w-5" /> View on Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
