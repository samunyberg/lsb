import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const CloseOnSwipeDown = ({ onClose, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    function handleTouchStart(event: TouchEvent) {
      touchStartY.current = event.touches[0].clientY;
    }

    function handleTouchMove(event: TouchEvent) {
      touchEndY.current = event.touches[0].clientY;
    }

    function handleTouchEnd() {
      if (touchStartY.current - touchEndY.current > 50) {
        // Swipe up - do nothing
      } else if (touchStartY.current - touchEndY.current < -50) {
        // Swipe down
        onClose();
      }
      // Reset touch Y positions
      touchStartY.current = 0;
      touchEndY.current = 0;
    }

    const node = ref.current;
    if (node) {
      node.addEventListener('touchstart', handleTouchStart);
      node.addEventListener('touchmove', handleTouchMove);
      node.addEventListener('touchend', handleTouchEnd);

      return () => {
        node.removeEventListener('touchstart', handleTouchStart);
        node.removeEventListener('touchmove', handleTouchMove);
        node.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [onClose]);

  return (
    <div className='h-full' ref={ref}>
      {children}
    </div>
  );
};

export default CloseOnSwipeDown;
