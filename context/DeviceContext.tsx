import { createContext, useEffect, useMemo, useState } from 'react';
import { useBreakpoint } from '@chakra-ui/react';

interface ExtendedNavigator extends Navigator {
  standalone: boolean;
}

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
  mobileNavHeightDvh: '8.5dvh' | '7dvh';
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
  const mobileNavHeightDvh = useMemo(
    () => (isAppleMobile ? '8.5dvh' : '7dvh'),
    [isAppleMobile]
  );

  useEffect(() => {
    setIsMobile(['base', 'sm'].includes(breakpoint));
  }, [breakpoint]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const navigator = window.navigator as ExtendedNavigator;
    if (
      navigator.standalone &&
      navigator.userAgent.match(/iPhone|iPad/) !== null
    ) {
      setIsAppleMobile(true);
    } else {
      setIsAppleMobile(false);
    }
  }, []);

  return (
    <DeviceContext.Provider
      value={{ isMobile, isAppleMobile, mobileNavHeightDvh }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
