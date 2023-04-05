import { createContext, useEffect, useMemo, useState } from 'react';
import { useBreakpoint } from '@chakra-ui/react';

interface DeviceProviderProps {
  children: React.ReactElement;
}

interface DeviceContextValue {
  isMobile: boolean;
  isAppleMobile: boolean;
  mobileNavHeightvh: '8.5vh' | '7vh';
}

export const DeviceContext = createContext({
  isMobile: true,
  isAppleMobile: false
} as DeviceContextValue);

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const breakpoint = useBreakpoint();
  const isMobile = useMemo(
    () => ['base', 'sm'].includes(breakpoint),
    [breakpoint]
  );

  const [isAppleMobile, setIsAppleMobile] = useState(false);
  const mobileNavHeightvh = useMemo(
    () => (isAppleMobile ? '8.5vh' : '7vh'),
    [isAppleMobile]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.navigator.userAgent.match(/iPhone|iPad/) !== null) {
      setIsAppleMobile(true);
    }
  }, []);

  return (
    <DeviceContext.Provider
      value={{ isMobile, isAppleMobile, mobileNavHeightvh }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
