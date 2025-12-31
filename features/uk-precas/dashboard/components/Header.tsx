import React from 'react';
import { SearchIcon, MenuIcon, SunIcon, MoonIcon } from './icons';
import { StudentProfile } from '../types';

interface HeaderProps {
  profile: StudentProfile;
  onMenuClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ profile, onMenuClick, theme, onToggleTheme }) => {
  const firstLetter = profile.name?.trim().charAt(0).toUpperCase() || 'U';

  return (
    <header className="flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4 ml-2">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      <div>
        <p className="text-gray-400 text-sm">Welcome back,</p>
          <h1 className="text-xl sm:text-2xl font-bold">{profile.name}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-purple flex items-center justify-center text-white font-bold text-sm sm:text-base ring-2 ring-primary-purple/50 overflow-hidden">
          {profile.photoURL ? (
            <img src={profile.photoURL} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span style={{ color: '#ffffff' }}>{firstLetter}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;