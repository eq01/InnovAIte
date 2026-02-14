import homeBackground from '../assets/home-page-background.jpg';

export function HomePage({ onOpenLogin, onOpenSignup, onOpenJournals, currentUser, onLogout }) {
  const userInitial = currentUser?.displayName?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase() || 'U';

  return (
    <main
      className="landing"
      style={{
        backgroundImage: `linear-gradient(rgba(28, 33, 42, 0.62), rgba(28, 33, 42, 0.62)), url(${homeBackground})`
      }}
    >
      <header className="landing-nav">
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <a href="#" className="nav-link">Home</a>
            </li>
            <li>
              <a href="#" className="nav-link">Analysis</a>
            </li>
            <li>
              <button
                type="button"
                className="nav-link nav-link-btn"
                onClick={currentUser ? onOpenJournals : onOpenSignup}
              >
                Journal Entry
              </button>
            </li>
          </ul>
        </nav>

        <div className="auth-actions" aria-label="Account actions">
          {currentUser ? (
            <button type="button" className="user-icon" aria-label="Signed in user" title="Click to log out" onClick={onLogout}>
              {userInitial}
            </button>
          ) : (
            <>
              <button type="button" className="auth-action auth-ghost" onClick={onOpenLogin}>
                Log in
              </button>
              <button type="button" className="auth-action auth-solid" onClick={onOpenSignup}>
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>Hello! What&apos;s on your mind today?</h1>
          <button
            type="button"
            className="journal-btn"
            aria-label="Create a new journal entry"
            onClick={currentUser ? onOpenJournals : onOpenLogin}
          >
            <span>new journal entry</span>
            <span className="plus" aria-hidden="true">+</span>
          </button>
        </div>
      </section>
    </main>
  );
}
