import { MessageCircle, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="tel:+919316698524"
        className="bg-violet-900 text-white p-3 rounded-full shadow-lg hover:bg-violet-800 transition-colors"
        aria-label="Call Us"
      >
        <PhoneCall className="h-6 w-6" />
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/919316698524"
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
