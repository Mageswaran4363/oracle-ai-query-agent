import { useRef, useEffect } from 'react';

const QueryInput = ({ value, onChange, onSubmit, isLoading, isDark }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      if (value.trim()) onSubmit();
    }
  };

  return (
    <div className={`rounded-2xl p-5 ${
      isDark ? 'card-glass' : 'bg-white/80 border border-slate-200/80 backdrop-blur-sm'
    } shadow-card`}>
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          Natural Language Query
        </span>
        <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
        {value.length > 0 && (
          <span className={`text-xs font-mono ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            {value.length} chars
          </span>
        )}
      </div>

      {/* Input area */}
      <div className="relative">
        <div className={`absolute left-4 top-4 flex-shrink-0 ${isDark ? 'text-amber-400/60' : 'text-indigo-400/60'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
          </svg>
        </div>

        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your Superstore data..."
          rows={3}
          disabled={isLoading}
          className={`w-full pl-12 pr-4 py-4 rounded-xl font-mono text-sm resize-none transition-all ${
            isDark
              ? 'query-input text-slate-100 placeholder-slate-600'
              : 'query-input-light text-slate-800 placeholder-slate-400'
          } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
        />

        {/* Character hint */}
        {value.length === 0 && (
          <div className={`absolute bottom-3 right-4 text-xs font-mono ${isDark ? 'text-slate-700' : 'text-slate-400'}`}>
            ↵ Enter to submit
          </div>
        )}
      </div>

      {/* Submit row */}
      <div className="flex items-center justify-between mt-4">
        <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Powered by SQL generation + LLM reasoning</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className={`btn-primary flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-display font-semibold text-navy-950 tracking-wide ${
            !isDark ? 'bg-indigo-600 hover:bg-indigo-700 text-white btn-indigo' : ''
          }`}
          style={!isDark ? {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
          } : {}}
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              Generate Insights
            </>
          )}
        </button>
      </div>

      {/* Loading banner */}
      {isLoading && (
        <div className={`mt-4 flex items-center gap-3 px-4 py-3 rounded-lg fade-in-up ${
          isDark ? 'bg-amber-400/5 border border-amber-400/15' : 'bg-indigo-50 border border-indigo-200'
        }`}>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-amber-400' : 'bg-indigo-500'} animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-amber-400/80' : 'text-indigo-600'}`}>
            Generating SQL and retrieving results...
          </span>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
