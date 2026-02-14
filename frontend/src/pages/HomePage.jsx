import homeBackground from '../assets/home-page-background.jpg';

export function HomePage() {
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
              <a href="#" className="nav-link">Journal Entry</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>Hello! What&apos;s on your mind today?</h1>
          <button type="button" className="journal-btn" aria-label="Create a new journal entry">
            <span>new journal entry</span>
            <span className="plus" aria-hidden="true">+</span>
          </button>
        </div>
      </section>
    </main>
  );
}
