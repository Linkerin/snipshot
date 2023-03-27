import { createContext, useEffect, useState } from 'react';
import { useBreakpoint } from '@chakra-ui/react';

interface DeviceProviderProps {
  children: React.ReactElement;
}

interface DeviceContextValue {
  isMobile: boolean;
  isTablet: boolean;
  isAppleMobile: boolean;
  mobileNavHeightvh: '8.5vh' | '7vh';
}

export const DeviceContext = createContext({
  isMobile: true,
  isTablet: false,
  isAppleMobile: false
} as DeviceContextValue);

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const breakpoint = useBreakpoint();
  const isMobile = ['base', 'sm'].includes(breakpoint);
  const isTablet = breakpoint === 'md';
  const [isAppleMobile, setIsAppleMobile] = useState(false);
  const mobileNavHeightvh = isAppleMobile ? '8.5vh' : '7vh';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.navigator.userAgent.match(/iPhone|iPad/) !== null) {
      setIsAppleMobile(true);
    }
  }, []);

  return (
    <DeviceContext.Provider
      value={{ isMobile, isTablet, isAppleMobile, mobileNavHeightvh }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
