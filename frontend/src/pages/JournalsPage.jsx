import { useEffect, useState } from 'react';
import { createJournalEntry, deleteJournalEntry, subscribeToJournals } from '../services/journalService.js';

export function JournalsPage({ user, onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return undefined;
    }

    try {
      return subscribeToJournals(user.id, setJournals, () => {
        setError('Could not load journals. Check Firebase rules and config.');
      });
    } catch (subscribeError) {
      setError(subscribeError instanceof Error ? subscribeError.message : 'Could not load journals.');
      return undefined;
    }
  }, [user?.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      await createJournalEntry(user.id, { title, content });
      setTitle('');
      setContent('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save entry.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(entryId) {
    setError('');

    try {
      await deleteJournalEntry(user.id, entryId);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete entry.');
    }
  }

  return (
    <main className="journals-page">
      <section className="journals-card">
        <div className="journals-header">
          <button type="button" className="back-home-chip" onClick={onBack}>
            Back to Home
          </button>
          <p>{user.displayName}</p>
        </div>

        <h1>Your journals</h1>

        <form className="journal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="How are you feeling?" />
          </label>

          <label>
            Entry
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              placeholder="Write your thoughts..."
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </form>

        <div className="journal-list" aria-label="Saved journals">
          {journals.length === 0 ? (
            <p className="journal-empty">No journal entries yet.</p>
          ) : (
            journals.map((entry) => (
              <article key={entry.id} className="journal-item">
                <div>
                  <h2>{entry.title}</h2>
                  <p>{entry.content || 'No content'}</p>
                </div>
                <button type="button" className="journal-delete" onClick={() => handleDelete(entry.id)}>
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
