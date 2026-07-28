import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import About from './pages/About';
import Facilities from './pages/Facilities';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import { LocationProvider } from './context/LocationContext';
import LocationSelectorModal from './components/LocationSelectorModal';

export default function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
          <LocationSelectorModal />
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </Router>
    </LocationProvider>
  );
}
