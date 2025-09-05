import React, { useState, Children, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  const prev = () => setCurrentIndex(i => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === items.length - 1 ? 0 : i + 1));
  const goTo = (index: number) => setCurrentIndex(index);

  return (
    <div className={`overflow-hidden relative rounded-lg shadow-lg ${className}`}>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
            <i className="bi bi-chevron-left text-xl"></i>
        </button>
        <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
            <i className="bi bi-chevron-right text-xl"></i>
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all w-2 h-2 bg-white rounded-full cursor-pointer ${currentIndex === i ? "p-1.5" : "bg-opacity-50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
