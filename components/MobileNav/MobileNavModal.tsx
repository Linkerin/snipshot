import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

function HeaderButton({ color }: { color: string }) {
  return (
    <Box
      bgColor={color}
      borderRadius="5px"
      cursor="pointer"
      mx="auto"
      my={2.5}
      height="5px"
      width="40%"
    />
  );
}

interface MobileNavModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  maxHeightvh?: string;
}

function MobileNavModal({
  isOpen,
  onClose,
  maxHeightvh = '65vh',
  children
}: MobileNavModalProps) {
  const [startTouchY, setStartTouchY] = useState<number | null>(null);
  const [barColor, setBarColor] = useState('red');
  const [bottomPosition, setBottomPosition] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (modalContentRef.current?.contains(e.target as HTMLElement)) return;

    setBarColor('green');
    setStartTouchY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setBarColor('red');
    const endTouchY = e.changedTouches[0].clientY;

    if (startTouchY && endTouchY - startTouchY > 30) {
      setStartTouchY(null);
      onClose();
      return;
    }

    setStartTouchY(null);
    setBottomPosition(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startTouchY) return;

    const slide = startTouchY - e.changedTouches[0].clientY;
    if (slide > 0) {
      setBottomPosition(0);
      return;
    }

    setBottomPosition(slide);
    return;
  };

  useEffect(() => {
    if (isOpen) setBottomPosition(0);
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} motionPreset="slideInBottom" onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          position="absolute"
          bottom={bottomPosition}
          borderRadius="1rem 1rem 0 0"
          m={0}
          maxHeight={maxHeightvh}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <ModalHeader py={3} onClick={onClose}>
            <HeaderButton color={barColor} />
          </ModalHeader>
          <ModalBody
            ref={modalContentRef}
            maxHeight={`calc(${maxHeightvh}) - 49px`}
            overflowY="scroll"
            py={0}
            px={10}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MobileNavModal;
