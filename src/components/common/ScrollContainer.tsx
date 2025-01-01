import { cn } from 'clsx-tailwind-merge';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props<T> {
  data: T[];
  renderItem: (item: T) => ReactNode;
}

const ScrollContainer = <T,>({ data, renderItem }: Props<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const childWidth = container.children[0].clientWidth + 12;
      const index = Math.round(scrollLeft / childWidth);

      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className='flex snap-x snap-mandatory gap-3 overflow-x-auto'
      >
        {data.map((item, index) => (
          <div
            key={index}
            className='hide-scrollbar h-full w-[90%] flex-shrink-0 snap-center'
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div className='mb-8 mt-4 flex justify-center gap-2'>
        {data.map((_, index) => (
          <div
            key={index}
            className={cn('size-2 rounded-full bg-accent transition-all', {
              'bg-primary': index === currentIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollContainer;
