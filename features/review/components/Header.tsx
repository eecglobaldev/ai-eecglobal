import React from 'react';
import DarkModeToggle from './DarkModeToggle';



interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-nowrap py-2 sm:py-0 sm:h-16">
        
        {/* Left section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
              <img src="/assets/logos/eeclogo-main.png" alt="EEC Logo" className="h-7 sm:h-9 w-auto" />
              <span className="text-sm sm:text-lg font-semibold text-slate-800 dark:text-slate-200 truncate">
              AI Testimonial Coach by EEC
              </span>
            </div>
  
        {/* Theme switcher */}
        <div className="flex-shrink-0 ml-2">
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </div>
  
      
        
    
      </div>
    </nav>
  </header>
  

  );
};

export default Header;
