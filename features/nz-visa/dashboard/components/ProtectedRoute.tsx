import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/features/shared/lib/firebase';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

/**
 * ProtectedRoute component ensures that only authenticated users can access the dashboard.
 * If a user is not authenticated, they will see a helpful message with a back button.
 *
 * This component uses the shared Firebase Authentication session from
 * https://ai.eecglobal.com/nzvisaprep/
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  if (authStatus === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-primary-dark-purple text-white">
        <p>Verifying authentication...</p>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    const handleGoBack = () => {
        window.location.href = '/nzvisaprep';
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-primary-dark-purple text-white gap-4 px-4 text-center">
        <button
          onClick={handleGoBack}
          className="bg-white text-primary-dark-purple font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
        >
          Go Back
        </button>
        <p className="text-lg max-w-md">
          You are not logged in. Go back by clicking on the above button.
        </p>
      </div>
    );
  }

  return children;
}

