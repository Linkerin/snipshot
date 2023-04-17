import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { useBreakpoint } from '@chakra-ui/react';

interface DeviceProviderProps {
  children: React.ReactElement;
  device: {
    type: string;
    model: string;
  };
}

interface DeviceContextValue {
  isMobile: boolean;
  isAppleMobile: boolean;
  mobileNavHeightvh: '8.5dvh' | '7dvh';
}

export const DeviceContext = createContext({
  isMobile: true,
  isAppleMobile: false
} as DeviceContextValue);

export const DeviceProvider = ({ device, children }: DeviceProviderProps) => {
  const breakpoint = useBreakpoint();
  const [isMobile, setIsMobile] = useState(device?.type === 'mobile');
  const [isAppleMobile, setIsAppleMobile] = useState(
    ['iPhone', 'iPad'].includes(device?.model)
  );
  const mobileNavHeightvh = useMemo(
    () => (isAppleMobile ? '8.5dvh' : '7dvh'),
    [isAppleMobile]
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (['base', 'sm'].includes(breakpoint)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [breakpoint]);

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
