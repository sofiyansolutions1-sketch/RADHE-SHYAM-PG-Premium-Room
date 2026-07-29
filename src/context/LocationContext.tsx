import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchId, Branch, branchData } from '../data/branches';

export { branchData };
export type { BranchId, Branch };

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
