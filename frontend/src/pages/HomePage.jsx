export function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <p className="brand">InnovAIte Health</p>
        <a className="topbar-link" href="#care">Care Pathway</a>
      </header>

      <section className="hero-panel">
        <div className="hero-copy reveal reveal-1">
          <p className="eyebrow">AI-Assisted Care Navigation</p>
          <h1 className="hero-title">Your smarter front door for healthcare journeys</h1>
          <p className="hero-text">
            Help patients move from symptoms to next best steps with clinician-safe triage, appointment guidance, and
            concise visit summaries.
          </p>
          <div className="hero-actions">
            <a className="cta cta-primary" href="#">Book a Demo</a>
            <a className="cta cta-secondary" href="#">See Patient Flow</a>
          </div>
          <div className="hero-metrics" aria-label="Platform outcomes">
            <div className="metric-pill">
              <strong>42%</strong>
              <span>faster intake</span>
            </div>
            <div className="metric-pill">
              <strong>24/7</strong>
              <span>patient support</span>
            </div>
            <div className="metric-pill">
              <strong>HIPAA</strong>
              <span>ready architecture</span>
            </div>
          </div>
        </div>

        <aside className="schedule-card reveal reveal-2" aria-label="Today appointments">
          <p className="card-label">Today at Downtown Clinic</p>
          <h2>3 visits prepped with AI notes</h2>
          <ul>
            <li>
              <span>09:20</span>
              <p>Hypertension follow-up with risk summary</p>
            </li>
            <li>
              <span>11:10</span>
              <p>Post-op check with medication reminders</p>
            </li>
            <li>
              <span>14:40</span>
              <p>Pediatric cough triage with escalation flags</p>
            </li>
          </ul>
        </aside>
      </section>

      <section className="service-grid reveal reveal-3" aria-label="Healthcare modules">
        <article className="service-card">
          <h3>Digital Front Desk</h3>
          <p>Patient-facing intake that captures symptoms and routes to the right department.</p>
        </article>
        <article className="service-card">
          <h3>Clinical Copilot</h3>
          <p>Auto-generated visit briefs with timeline context and next-step recommendations.</p>
        </article>
        <article className="service-card">
          <h3>Care Follow-Through</h3>
          <p>Automated reminders, care plan check-ins, and plain-language post-visit summaries.</p>
        </article>
      </section>

      <section className="pathway reveal reveal-4" id="care" aria-label="Care pathway">
        <h2>How patients move through care</h2>
        <div className="pathway-steps">
          <article>
            <span>01</span>
            <h3>Assess</h3>
            <p>Patients describe symptoms; urgency and specialty are scored instantly.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Align</h3>
            <p>The platform suggests visit type, location, and prep checklist.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Act</h3>
            <p>Care teams receive structured notes and follow-up tasks in one view.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
