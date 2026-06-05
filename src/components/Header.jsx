import { useState, useEffect } from 'react';

const Header = ({ isDark, onThemeToggle }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });

  const dateStr = time.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <header className={`relative overflow-hidden ${isDark ? 'border-b border-amber-400/10' : 'border-b border-indigo-200/60'}`}>
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950'
          : 'bg-gradient-to-br from-indigo-50 via-white to-violet-50'
      }`} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow accent */}
      <div className={`absolute top-0 left-1/3 w-96 h-32 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-amber-400/8' : 'bg-indigo-400/12'
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${
              isDark ? 'bg-amber-400/15 border border-amber-400/25' : 'bg-indigo-100 border border-indigo-200'
            }`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-indigo-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className={`font-display text-sm font-semibold tracking-wide ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              DATAQUERY <span className={isDark ? 'text-amber-400' : 'text-indigo-500'}>AI</span>
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Live clock */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md ${
              isDark ? 'bg-navy-900/60 border border-slate-700/50' : 'bg-white/60 border border-slate-200'
            }`}>
              <div className="status-dot" />
              <span className={`font-mono text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {timeStr}
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>·</span>
              <span className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {dateStr}
              </span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={onThemeToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-body transition-all ${
                isDark
                  ? 'bg-slate-800/80 border border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-400/30'
                  : 'bg-white/80 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                  Dark
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main title block */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
              isDark
                ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                : 'bg-indigo-100 text-indigo-600 border border-indigo-200'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              NATURAL LANGUAGE INTERFACE v2.1
            </span>
          </div>

          <h1
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            AI-Powered{' '}
            <span className={isDark ? 'shimmer-text' : 'text-indigo-600'}>
              Natural Language
            </span>
            <br />
            Query Agent
          </h1>

          <p className={`font-body text-base md:text-lg leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Ask questions about your business data in plain English.
            No SQL required — get instant, structured insights.
          </p>
        </div>

        {/* Stats strip */}
        <div className={`flex items-center gap-6 mt-6 pt-5 border-t ${
          isDark ? 'border-slate-800/60' : 'border-slate-200/60'
        }`}>
          {[
            { label: 'Data Source', value: 'Superstore DB' },
            { label: 'Engine', value: 'FastAPI + LLM' },
            { label: 'Response', value: '< 3s avg' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{stat.label}</span>
              <span className={`text-xs font-mono font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
