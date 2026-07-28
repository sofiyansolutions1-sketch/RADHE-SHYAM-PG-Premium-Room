import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocationContext, branchData, BranchId } from '../context/LocationContext';
import { MapPin } from 'lucide-react';

export default function LocationSelectorModal() {
  const { activeBranchId, setActiveBranchId } = useLocationContext();

  if (activeBranchId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-10 max-w-4xl w-full shadow-2xl relative overflow-hidden"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-violet-900 mb-4">Welcome to Radhe Shyam PG</h2>
            <p className="text-gray-600 text-lg">Please select your preferred location to continue</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(Object.keys(branchData) as BranchId[]).map((id) => {
              const branch = branchData[id];
              return (
                <button
                  key={id}
                  onClick={() => setActiveBranchId(id)}
                  className="group flex flex-col items-center text-center bg-gray-50 hover:bg-violet-50 rounded-2xl p-6 sm:p-8 border-2 border-transparent hover:border-violet-500 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-6 relative">
                    <img 
                      src={branch.images[0]} 
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                      <span className="bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg mb-2 inline-block">
                        {branch.forWhom}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-violet-900 mb-2">{branch.subtitle}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{branch.address}</p>
                  
                  <div className="inline-flex items-center text-fuchsia-600 font-semibold group-hover:text-fuchsia-700">
                    <MapPin className="w-5 h-5 mr-2" />
                    Select Location
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
