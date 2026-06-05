import { useState, useEffect } from 'react';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import SampleQuestions from './components/SampleQuestions';
import ResultsTable from './components/ResultsTable';
import { queryData } from './services/api';

const ErrorBanner = ({ message, onDismiss, isDark }) => (
  <div className={`fade-in-up flex items-start gap-3 px-5 py-4 rounded-2xl border ${
    isDark
      ? 'bg-red-500/5 border-red-500/20 text-red-400'
      : 'bg-red-50 border-red-200 text-red-600'
  }`}>
    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
      isDark ? 'bg-red-500/10' : 'bg-red-100'
    }`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
    </div>
    <div className="flex-1">
      <p className={`text-sm font-display font-semibold mb-0.5 ${isDark ? 'text-red-300' : 'text-red-700'}`}>
        Query Failed
      </p>
      <p className={`text-xs font-body ${isDark ? 'text-red-400/80' : 'text-red-600/80'}`}>{message}</p>
    </div>
    <button
      onClick={onDismiss}
      className={`flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity ${isDark ? 'text-red-400' : 'text-red-600'}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
);

const EmptyState = ({ isDark }) => (
  <div className={`fade-in-up rounded-2xl p-12 text-center ${
    isDark ? 'card-glass' : 'bg-white/60 border border-slate-200/80'
  }`}>
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
      isDark ? 'bg-slate-800/80' : 'bg-slate-100'
    }`}>
      <svg className={`w-8 h-8 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>
      </svg>
    </div>
    <h3 className={`font-display text-lg font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
      No results yet
    </h3>
    <p className={`font-body text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
      Ask a question above or select a sample query to get started.
    </p>
  </div>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState(null);
  const [lastQuestion, setLastQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryCount, setQueryCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleSubmit = async () => {
    if (!question.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResults(null);
    const q = question.trim();
    setLastQuestion(q);

    try {
      const data = await queryData(q);
      if (!data?.rows || data.rows.length === 0) {
        setError('The query returned no data. Try rephrasing your question.');
      } else {
        setResults(data.rows);
        setQueryCount(c => c + 1);
      }
    } catch (err) {
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error') || !err.response) {
        setError('Cannot connect to the backend API at localhost:8000. Make sure your FastAPI server is running.');
      } else if (err.response?.status === 422) {
        setError('Invalid query format. Please rephrase your question.');
      } else if (err.response?.status === 500) {
        setError('The server encountered an error processing your query. Please try again.');
      } else {
        setError(err.response?.data?.detail || err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleSelect = (q) => {
    setQuestion(q);
    setError(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      isDark ? 'bg-navy-950' : 'bg-slate-50'
    }`}>
      {/* Background texture */}
      <div className={`fixed inset-0 pointer-events-none ${isDark ? 'grid-bg opacity-30' : 'opacity-0'}`} />

      <Header isDark={isDark} onThemeToggle={() => setIsDark(d => !d)} />

      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Stats row (after queries) */}
          {queryCount > 0 && (
            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl fade-in-up w-fit ${
              isDark ? 'bg-emerald-500/8 border border-emerald-500/15' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-xs font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {queryCount} successful {queryCount === 1 ? 'query' : 'queries'} this session
              </span>
            </div>
          )}

          {/* Query input */}
          <QueryInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDark={isDark}
          />

          {/* Error */}
          {error && (
            <ErrorBanner
              message={error}
              onDismiss={() => setError(null)}
              isDark={isDark}
            />
          )}

          {/* Results or empty state */}
          {results ? (
            <ResultsTable
              rows={results}
              question={lastQuestion}
              isDark={isDark}
            />
          ) : !isLoading && !error && (
            <EmptyState isDark={isDark} />
          )}

          {/* Sample questions */}
          <div className={`rounded-2xl p-5 ${
            isDark ? 'card-glass' : 'bg-white/70 border border-slate-200/80 backdrop-blur-sm'
          } shadow-card`}>
            <SampleQuestions onSelect={handleSampleSelect} isDark={isDark} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t py-4 px-6 ${
        isDark ? 'border-slate-800/50' : 'border-slate-200/60'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`text-xs font-mono ${isDark ? 'text-slate-700' : 'text-slate-400'}`}>
            NL Query Agent · FastAPI + React · localhost:8000
          </span>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-700' : 'text-slate-400'}`}>
            Superstore Dataset
          </span>
        </div>
      </footer>
    </div>
  );
}
