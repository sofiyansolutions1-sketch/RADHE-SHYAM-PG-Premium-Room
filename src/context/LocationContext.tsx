import React, { createContext, useContext, useState, useEffect } from 'react';

export type BranchId = 'akota' | 'alkapuri';

export interface PricingPlan {
  type: string;
  price: string;
  popular?: boolean;
}

export interface AmenityItem {
  title: string;
}

export interface Branch {
  id: BranchId;
  name: string;
  subtitle: string;
  forWhom: string;
  address: string;
  phone: string;
  displayPhone: string;
  email: string;
  mapUrl: string;
  mapEmbedUrl: string;
  description: string;
  images: string[];
  pricing: PricingPlan[];
  amenities: AmenityItem[];
}

export const branchData: Record<BranchId, Branch> = {
  akota: {
    id: 'akota',
    name: 'RADHE SHYAM PG',
    subtitle: 'Akota, Vadodara',
    forWhom: 'Girls & Boys',
    address: 'Silver Square, apartments, Shree Nagar Society, Akota, Vadodara, Gujarat 390020',
    phone: '919316698524',
    displayPhone: '+91 93166 98524',
    email: 'radhesyampg7373@gmail.com',
    mapUrl: 'https://www.google.com/maps/place/Radhe+Shyam+Pg/data=!4m2!3m1!1s0x0:0xf331343bedc97d9b?sa=X&ved=1t:2428&hl=en-US&ictx=111',
    mapEmbedUrl: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Silver%20Square,%20apartments,%20Shree%20Nagar%20Society,%20Akota,%20Vadodara+(Radhe%20Shyam%20PG)&t=&z=15&ie=UTF8&iwloc=B&output=embed',
    description: 'Premium Paying Guest accommodation for Girls & Boys focusing on safety, comfort, and community. Your home away from home.',
    images: [
      'https://iili.io/CNTshBV.png',
      'https://iili.io/CNTQw5F.png',
      'https://iili.io/CNTt9GR.png',
      'https://iili.io/CNTbJet.png',
      'https://iili.io/CNTpm1j.png',
      'https://iili.io/CNuHfUv.png',
      'https://iili.io/CNuJs3b.png'
    ],
    pricing: [
      { type: 'Starting Rent', price: '₹4,500', popular: false },
      { type: 'Triple Sharing', price: '₹6,000', popular: false },
      { type: 'Double Sharing', price: '₹7,500', popular: true }
    ],
    amenities: [
      { title: 'Air Conditioned Rooms' },
      { title: 'Refrigerator' },
      { title: 'Fully Automatic Washing Machine' },
      { title: 'RO Drinking Water' },
      { title: '24×7 Hot Water (Geyser)' },
      { title: 'High-speed Wi-Fi' },
      { title: 'Daily Housekeeping' },
      { title: '24×7 CCTV Security' }
    ]
  },
  alkapuri: {
    id: 'alkapuri',
    name: "RADHE SHYAM PG - for girl's",
    subtitle: 'Alkapuri, Vadodara',
    forWhom: 'Girls Only',
    address: '301 - 302 A magal Murti apartment RC Dutt Rd, Alkapuri, Vadodara, Gujarat 390007',
    phone: '918780865191',
    displayPhone: '+91 8780865191',
    email: 'radheshyampg7070@gmail.com',
    mapUrl: 'https://www.google.com/maps?q=22.3112225,73.1702632&z=17&hl=en',
    mapEmbedUrl: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=301%20-%20302%20A%20magal%20Murti%20apartment%20RC%20Dutt%20Rd,%20Alkapuri,%20Vadodara+(Radhe%20Shyam%20PG)&t=&z=17&ie=UTF8&iwloc=B&output=embed',
    description: 'Radhe Shyam PG is a premium PG in Alkapuri, Vadodara, offering a safe, comfortable, and well-maintained stay for students and working professionals.',
    images: [
      'https://iili.io/Cv48mqg.jpg',
      'https://iili.io/Cv4SrQt.jpg',
      'https://iili.io/Cv464rF.jpg',
      'https://iili.io/Cv44TFe.jpg',
      'https://iili.io/Cv4krQe.jpg',
      'https://iili.io/Cv4vbS4.jpg'
    ],
    pricing: [
      { type: 'Starting From', price: '₹4,500', popular: false },
      { type: '3 Sharing AC', price: '₹6,000', popular: false },
      { type: '2 Sharing AC', price: '₹7,500', popular: true }
    ],
    amenities: [
      { title: 'Air Conditioned Rooms' },
      { title: 'Refrigerator' },
      { title: 'Fully Automatic Washing Machine' },
      { title: 'RO Drinking Water' },
      { title: '24×7 Hot Water (Geyser)' },
      { title: 'High-Speed Wi-Fi' },
      { title: '24×7 CCTV Security' },
      { title: 'Modern Modular Kitchen' },
      { title: 'Gas Stove Facility' },
      { title: 'Comfortable Personal Bed' },
      { title: 'Individual Locker' },
      { title: 'Attached Bathroom & Private Balcony' },
      { title: 'Daily Housekeeping & Cleaning' },
      { title: 'Electricity Included (AC charged separately)' }
    ]
  }
};

interface LocationContextType {
  activeBranchId: BranchId | null;
  setActiveBranchId: (id: BranchId | null) => void;
  activeBranch: Branch | null;
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [activeBranchId, setActiveBranchId] = useState<BranchId | null>(() => {
    return (localStorage.getItem('selectedBranch') as BranchId) || null;
  });

  useEffect(() => {
    if (activeBranchId) {
      localStorage.setItem('selectedBranch', activeBranchId);
    } else {
      localStorage.removeItem('selectedBranch');
    }
  }, [activeBranchId]);

  const activeBranch = activeBranchId ? branchData[activeBranchId] : null;

  return (
    <LocationContext.Provider value={{ activeBranchId, setActiveBranchId, activeBranch }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
