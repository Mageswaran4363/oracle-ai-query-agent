const SAMPLE_QUESTIONS = [
  {
    question: 'What were total sales by region?',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    tag: 'Geographic',
  },
  {
    question: 'Top 10 products by sales',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    ),
    tag: 'Rankings',
  },
  {
    question: 'Total profit by category',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    tag: 'Profitability',
  },
  {
    question: 'Sales by country',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    tag: 'Global',
  },
  {
    question: 'Which customer segment generates the highest revenue?',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    tag: 'Segments',
  },
  {
    question: 'Monthly sales trend for the last year',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    tag: 'Trends',
  },
];

const SampleQuestions = ({ onSelect, isDark }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          Sample Queries
        </span>
        <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {SAMPLE_QUESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(item.question)}
            className={`group flex items-start gap-3 p-3.5 rounded-xl text-left cursor-pointer ${
              isDark ? 'sample-card' : 'sample-card-light'
            }`}
          >
            <span className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg mt-0.5 ${
              isDark
                ? 'bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20'
                : 'bg-indigo-100 text-indigo-500 group-hover:bg-indigo-200'
            } transition-colors`}>
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug font-body ${
                isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'
              } transition-colors`}>
                {item.question}
              </p>
              <span className={`inline-block mt-1.5 text-xs px-1.5 py-0.5 rounded-md font-mono ${
                isDark
                  ? 'bg-slate-800/80 text-slate-500'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {item.tag}
              </span>
            </div>
            <svg
              className={`flex-shrink-0 w-3.5 h-3.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                isDark ? 'text-amber-400' : 'text-indigo-500'
              }`}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleQuestions;
