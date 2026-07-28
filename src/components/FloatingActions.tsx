import { MessageCircle, PhoneCall, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocationContext, branchData } from '../context/LocationContext';

export default function FloatingActions() {
  const { activeBranchId, setActiveBranchId } = useLocationContext();
  const activeBranch = activeBranchId ? branchData[activeBranchId] : branchData.akota; // fallback

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActiveBranchId(null)}
        className="bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-colors hidden md:flex items-center justify-center"
        aria-label="Change Location"
        title="Change Location"
      >
        <MapPin className="h-6 w-6" />
      </motion.button>
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`tel:+${activeBranch.phone}`}
        className="bg-violet-900 text-white p-3 rounded-full shadow-lg hover:bg-violet-800 transition-colors"
        aria-label="Call Us"
      >
        <PhoneCall className="h-6 w-6" />
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${activeBranch.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
