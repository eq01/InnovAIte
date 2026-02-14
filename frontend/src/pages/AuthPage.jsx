import { useState } from 'react';

export function AuthPage({ mode, onModeChange, onBack, onLogin, onSignup, onAuthSuccess }) {
  const isLogin = mode === 'login';
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      if (isLogin) {
        await onLogin({
          email: formData.get('email')?.toString().trim(),
          password: formData.get('password')?.toString()
        });
      } else {
        await onSignup({
          fullName: formData.get('fullName')?.toString().trim(),
          email: formData.get('email')?.toString().trim(),
          password: formData.get('password')?.toString(),
          confirmPassword: formData.get('confirmPassword')?.toString()
        });
      }

      onAuthSuccess();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Authentication">
        <div className="auth-top-controls" role="tablist" aria-label="Authentication mode">
          <button type="button" className="switch-btn back-home-btn" onClick={onBack}>
            Back to Home
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={`switch-btn ${isLogin ? 'active' : ''}`}
            onClick={() => onModeChange('login')}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={`switch-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => onModeChange('signup')}
          >
            Sign Up
          </button>
        </div>

        <h1>{isLogin ? 'Welcome back' : 'Create your account'}</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Full Name
              <input name="fullName" type="text" placeholder="Jane Doe" required />
            </label>
          )}

          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>

          <label>
            Password
            <input name="password" type="password" placeholder="Enter password" required />
          </label>

          {!isLogin && (
            <label>
              Confirm Password
              <input name="confirmPassword" type="password" placeholder="Confirm password" required />
            </label>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </section>
    </main>
  );
}
