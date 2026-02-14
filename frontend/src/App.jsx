import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { JournalsPage } from './pages/JournalsPage.jsx';
import { getCurrentUser, signIn, signOut, signUp, subscribeAuthStateChange } from './services/authService.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  useEffect(() => {
    return subscribeAuthStateChange(setCurrentUser);
  }, []);

  useEffect(() => {
    if (!currentUser && page === 'journals') {
      setPage('home');
    }
  }, [currentUser, page]);

  if (page === 'auth') {
    return (
      <AuthPage
        mode={authMode}
        onModeChange={setAuthMode}
        onBack={() => setPage('home')}
        onLogin={signIn}
        onSignup={signUp}
        onAuthSuccess={() => setPage('home')}
      />
    );
  }

  if (page === 'journals' && currentUser) {
    return <JournalsPage user={currentUser} onBack={() => setPage('home')} />;
  }

  return (
    <HomePage
      currentUser={currentUser}
      onLogout={async () => {
        await signOut();
        setPage('home');
      }}
      onOpenJournals={() => setPage('journals')}
      onOpenLogin={() => {
        setAuthMode('login');
        setPage('auth');
      }}
      onOpenSignup={() => {
        setAuthMode('signup');
        setPage('auth');
      }}
    />
  );
}
