import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    room: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const phoneNumber = "919316698524";
    const text = `*New Inquiry from Website*
*Name:* ${formData.name}
*Contact Number:* ${formData.phone}
*Room Preference:* ${formData.room}
*Description/Notes:* ${formData.notes}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success state briefly
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', room: '', notes: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 pb-16 md:pb-20">
      {/* Header */}
      <div className="bg-violet-900 py-16 md:py-24 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6"
        >
          Inquiry Form
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto"
        >
          Interested in staying with us? Send us an inquiry and we'll get back to you immediately on WhatsApp.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] md:mt-[-4rem] relative z-10 flex flex-col gap-12">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 lg:p-14 bg-white rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-violet-900">Send an Inquiry</h3>
            <p className="text-gray-500 mt-2">Fill out the form below and we'll connect with you on WhatsApp</p>
          </div>
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-fuchsia-500" />
              </div>
              <h4 className="text-2xl font-bold text-violet-900 mb-2">Redirecting to WhatsApp!</h4>
              <p className="text-gray-600">Your inquiry has been formulated. Please hit send in WhatsApp to reach out to us.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">Select Your Room</label>
                <select
                  id="room"
                  name="room"
                  required
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="" disabled>Choose Room Type</option>
                  <option value="Starting Rent">Starting Rent</option>
                  <option value="Sharing Room">Sharing Room</option>
                  <option value="Double Sharing">Double Sharing Room</option>
                  <option value="Triple Sharing">Triple Sharing Room</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Notepad Description (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                  placeholder="Any specific requirements, questions, or details you'd like to add..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 px-8 text-lg font-medium text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded-xl transition-colors shadow-lg hover:shadow-fuchsia-500/30 flex justify-center items-center"
              >
                <Send className="mr-2 w-5 h-5" /> Submit Inquiry
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-violet-900 text-white p-6 sm:p-10 lg:p-14 rounded-3xl shadow-xl border border-violet-800"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Book a Visit</h3>
            <p className="text-violet-200">Prefer to speak directly or visit us? Here are our details.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex items-start">
              <MapPin className="w-8 h-8 text-fuchsia-400 mr-4 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-xl mb-2">Office Address</h4>
                <p className="text-violet-200 leading-relaxed text-lg">Silver Square, apartments, Shree Nagar Society, Akota, Vadodara, Gujarat 390020</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-8 h-8 text-fuchsia-400 mr-4 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-xl mb-2">Phone</h4>
                <p className="text-violet-200 text-lg"><a href="tel:+919316698524" className="hover:text-white transition-colors">+91 93166 98524</a></p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-8 h-8 text-fuchsia-400 mr-4 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-xl mb-2">Email</h4>
                <p className="text-violet-200 text-lg"><a href="mailto:radhesyampg7373@gmail.com" className="hover:text-white transition-colors">radhesyampg7373@gmail.com</a></p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-8 h-8 text-fuchsia-400 mr-4 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-xl mb-2">Visiting Hours</h4>
                <p className="text-violet-200 text-lg">Monday - Sunday<br/>10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
          
          {/* Decoration */}
          <div className="mt-12 pt-8 border-t border-violet-800 text-center">
             <p className="text-violet-300 italic text-lg">"We look forward to welcoming you to our community."</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
