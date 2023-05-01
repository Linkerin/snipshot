import {
  createContext,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
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
  isAppleMobile: false,
  mobileNavHeightDvh: '7dvh'
} as DeviceContextValue);

export const DeviceProvider = ({ device, children }: DeviceProviderProps) => {
  const breakpoint = useBreakpoint(device?.type === 'mobile' ? 'sm' : 'lg');
  const [isMobile, setIsMobile] = useState(device?.type === 'mobile');
  const [isAppleMobile, setIsAppleMobile] = useState(
    ['iPhone', 'iPad'].includes(device?.model)
  );
  const mobileNavHeightDvh = useMemo(
    () => (isAppleMobile ? '8.5dvh' : '7dvh'),
    [isAppleMobile]
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    startTransition(() => {
      setIsMobile(['base', 'sm'].includes(breakpoint));
    });
  }, [breakpoint]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const navigator = window.navigator as ExtendedNavigator;
    const appleMobile =
      navigator.standalone && navigator.userAgent.match(/iPhone|iPad/) !== null;
    startTransition(() => {
      setIsAppleMobile(appleMobile);
    });
  }, []);

  return (
    <DeviceContext.Provider
      value={{ isMobile, isAppleMobile, mobileNavHeightDvh }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
