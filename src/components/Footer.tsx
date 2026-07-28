import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useLocationContext, branchData } from '../context/LocationContext';

export default function Footer() {
  const { activeBranchId } = useLocationContext();
  const activeBranch = activeBranchId ? branchData[activeBranchId] : branchData.akota; // fallback

  return (
    <footer className="bg-violet-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & About */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              {activeBranch.name.split(' ').map((word, i) => word === 'PG' ? <span key={i} className="text-fuchsia-400">PG </span> : word + ' ')}
            </h3>
            <p className="text-violet-200 text-sm leading-relaxed mb-6">
              {activeBranch.description}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/vadodara_pg_girls?igsh=MTcwaTVuNmhhdGM1aQ%3D%3D" target="_blank" rel="noopener noreferrer" className="text-violet-200 hover:text-fuchsia-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-amber-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-violet-200 hover:text-fuchsia-400 text-sm">Home</Link></li>
              <li><Link to="/about" className="text-violet-200 hover:text-fuchsia-400 text-sm">About Us</Link></li>
              <li><Link to="/facilities" className="text-violet-200 hover:text-fuchsia-400 text-sm">Facilities</Link></li>
              <li><Link to="/locations" className="text-violet-200 hover:text-fuchsia-400 text-sm">Locations</Link></li>
              <li><Link to="/contact" className="text-violet-200 hover:text-fuchsia-400 text-sm">Book a Visit</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-amber-500">Contact Us</h4>
            <ul className="space-y-4 text-sm text-violet-200">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-fuchsia-400 shrink-0 mt-0.5" />
                <span>{activeBranch.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-fuchsia-400 shrink-0" />
                <a href={`mailto:${activeBranch.email}`} className="hover:text-fuchsia-400">{activeBranch.email}</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-fuchsia-400 shrink-0" />
                <a href={`tel:+${activeBranch.phone}`} className="hover:text-fuchsia-400">{activeBranch.displayPhone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-800 mt-12 pt-8 text-center text-sm text-violet-300">
          <p>&copy; {new Date().getFullYear()} {activeBranch.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
