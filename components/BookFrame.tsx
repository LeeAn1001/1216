import React from 'react';

interface BookFrameProps {
  children: React.ReactNode;
}

const BookFrame: React.FC<BookFrameProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-md mx-auto p-2 bg-ink-blue rounded shadow-2xl">
      {/* Outer Border (Indigo) */}
      <div className="h-full w-full bg-paper-bg border-[4px] border-double border-ink-blue p-6 md:p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] shadow-inner">
        
        {/* Decorative Corner Patterns (CSS Simulation) */}
        <div className="absolute top-2 left-2 w-16 h-16 border-t-4 border-l-4 border-ink-blue opacity-50 rounded-tl-xl pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-16 h-16 border-t-4 border-r-4 border-ink-blue opacity-50 rounded-tr-xl pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-16 h-16 border-b-4 border-l-4 border-ink-blue opacity-50 rounded-bl-xl pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-16 h-16 border-b-4 border-r-4 border-ink-blue opacity-50 rounded-br-xl pointer-events-none"></div>

        {/* Inner Content Area */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BookFrame;
