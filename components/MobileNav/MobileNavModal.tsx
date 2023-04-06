import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

const defaultHeaderBtnColor = '#bdbdbd';

function HeaderButton({ color = defaultHeaderBtnColor }: { color: string }) {
  return (
    <Box
      bgColor={color}
      cursor="pointer"
      mx="auto"
      my={1}
      height="2px"
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
  const [btnColor, setBtnColor] = useState(defaultHeaderBtnColor);
  const [bottomPosition, setBottomPosition] = useState(0);

  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (modalContentRef.current?.contains(e.target as HTMLElement)) return;

    setBtnColor('primary-dark');
    setStartTouchY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setBtnColor(defaultHeaderBtnColor);
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
          borderRadius="0.5rem 0.5rem 0 0"
          m={0}
          maxHeight={maxHeightvh}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          maxWidth="100%"
          bgColor="chakra-body-bg"
        >
          <ModalHeader py={2.5} onClick={onClose} cursor="pointer">
            <HeaderButton color={btnColor} />
          </ModalHeader>
          <ModalBody
            ref={modalContentRef}
            maxHeight={`calc(${maxHeightvh}) - 49px`}
            overflowY="scroll"
            py={0}
            px={5}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MobileNavModal;
