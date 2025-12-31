import React, { useMemo } from 'react';
import { HomeIcon, DocumentIcon, ChartBarIcon, UsersIcon, CogIcon, LogoutIcon, XIcon } from './icons';
import { auth } from '@/features/shared/lib/firebase';
import { signOut } from 'firebase/auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profileName?: string;
  photoURL?: string;
  theme?: 'light' | 'dark';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, profileName, photoURL, theme = 'dark' }) => {
  const firstLetter = useMemo(() => {
    if (!profileName) return 'U';
    return profileName.trim().charAt(0).toUpperCase() || 'U';
  }, [profileName]);
  // const navItems = [
  //   { icon: <HomeIcon />, active: true },
  //   // { icon: <DocumentIcon />, active: false },
  //   // { icon: <ChartBarIcon />, active: false },
  //   // { icon: <UsersIcon />, active: false },
  //   // { icon: <CogIcon />, active: false },
  // ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static
        top-0 left-0 h-full
        bg-glass-bg p-4 rounded-3xl lg:rounded-3xl
        flex flex-col items-center justify-between
        border border-glass-border shadow-2xl
        z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-20 lg:w-auto
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 left-4 p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all z-10"
        >
          <XIcon className="h-6 w-6" />
        </button>

      <div className="w-full flex flex-col items-center mt-12 lg:mt-0">
          <div className="w-12 h-12 rounded-full border-2 border-primary-purple mb-10 overflow-hidden shadow-lg bg-primary-purple">
            {photoURL ? (
              <img src={photoURL} alt={profileName} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-bold text-xl"
                style={{ color: '#ffffff' }}
              >
                {firstLetter}
              </div>
            )}
        </div>
        <nav className="flex flex-col items-center gap-6 mb-2">
            <button
              onClick={() => {
                onClose();
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = document.referrer || '/';
                }
              }}
              className="p-3 rounded-xl bg-primary-purple text-white shadow-lg transition-all duration-300 transform hover:scale-110"
              style={{ color: '#ffffff' }}
            >
              <HomeIcon  style={{ color: '#ffffff' }} />
            </button>
        </nav>
      </div>
        <button 
          onClick={async () => {
            try {
              onClose();
              // Sign out from Firebase
              await signOut(auth);
              // Clear all localStorage data
              localStorage.clear();
              // Clear all session storage as well
              sessionStorage.clear();
              // Redirect to usavisaprep site
              window.location.href = '/usavisaprep/';
            } catch (error) {
              console.error('Error during logout:', error);
              // Even if there's an error, clear storage and redirect
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = '/usavisaprep/';
            }
          }}
          className="p-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300 transform hover:scale-110"
        >
        <LogoutIcon />
      </button>
    </aside>
    </>
  );
};

export default Sidebar;
