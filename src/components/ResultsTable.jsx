import { useState, useMemo } from 'react';

const formatValue = (val) => {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'number') {
    if (Number.isInteger(val) && Math.abs(val) > 1000) {
      return val.toLocaleString('en-US');
    }
    if (!Number.isInteger(val)) {
      return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return val.toLocaleString('en-US');
  }
  return String(val);
};

const isNumericColumn = (rows, key) =>
  rows.every(row => row[key] === null || row[key] === undefined || typeof row[key] === 'number');

const ResultsTable = ({ rows, question, isDark }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, dir: 'desc' });
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 25;

  const columns = useMemo(() => {
    if (!rows?.length) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const sortedRows = useMemo(() => {
    if (!sortConfig.key) return rows;
    return [...rows].sort((a, b) => {
      const va = a[sortConfig.key];
      const vb = b[sortConfig.key];
      if (va === vb) return 0;
      const cmp = va < vb ? -1 : 1;
      return sortConfig.dir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortConfig]);

  const pageRows = sortedRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sortedRows.length / PAGE_SIZE);

  const toggleSort = (col) => {
    setSortConfig(prev =>
      prev.key === col
        ? { key: col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key: col, dir: 'desc' }
    );
    setPage(0);
  };

  if (!rows?.length) return null;

  return (
    <div className={`rounded-2xl overflow-hidden fade-in-up ${
      isDark ? 'card-glass' : 'bg-white/80 border border-slate-200/80 backdrop-blur-sm'
    } shadow-card`}>
      {/* Header strip */}
      <div className={`flex items-center justify-between px-5 py-4 ${
        isDark ? 'border-b border-slate-800/60' : 'border-b border-slate-200/60'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
            isDark ? 'bg-amber-400/10' : 'bg-indigo-100'
          }`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-indigo-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 10h18M3 14h18M10 4v16M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"/>
            </svg>
          </div>
          <div>
            <h3 className={`text-sm font-display font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Query Results
            </h3>
            {question && (
              <p className={`text-xs mt-0.5 truncate max-w-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                "{question}"
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            isDark ? 'bg-navy-900/60 border border-slate-800' : 'bg-slate-50 border border-slate-200'
          }`}>
            <svg className={`w-3.5 h-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
            </svg>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className={isDark ? 'text-amber-400 font-semibold' : 'text-indigo-600 font-semibold'}>{rows.length}</span>
              {' '}row{rows.length !== 1 ? 's' : ''}
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
              · {columns.length} col{columns.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className={`${isDark ? 'bg-navy-900/50' : 'bg-slate-50/80'}`}>
              <th className={`w-12 px-4 py-3 text-left text-xs font-mono ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                #
              </th>
              {columns.map(col => (
                <th
                  key={col}
                  onClick={() => toggleSort(col)}
                  className={`px-4 py-3 text-left text-xs font-mono uppercase tracking-wider cursor-pointer select-none transition-colors ${
                    isDark
                      ? `text-slate-500 hover:text-amber-400 ${sortConfig.key === col ? 'text-amber-400' : ''}`
                      : `text-slate-500 hover:text-indigo-600 ${sortConfig.key === col ? 'text-indigo-600' : ''}`
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {col}
                    <span className={`transition-opacity ${sortConfig.key === col ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig.key === col && sortConfig.dir === 'asc' ? '↑' : '↓'}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
            {pageRows.map((row, idx) => (
              <tr
                key={idx}
                className={`${isDark ? 'table-row-hover' : 'table-row-hover-light'} transition-colors`}
              >
                <td className={`px-4 py-3 text-xs font-mono ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
                  {page * PAGE_SIZE + idx + 1}
                </td>
                {columns.map(col => {
                  const val = row[col];
                  const isNum = isNumericColumn(rows, col);
                  return (
                    <td
                      key={col}
                      className={`px-4 py-3 text-sm whitespace-nowrap ${
                        isNum
                          ? `font-mono text-right ${isDark ? 'text-amber-400/90' : 'text-indigo-600'}`
                          : `font-body ${isDark ? 'text-slate-300' : 'text-slate-700'}`
                      }`}
                    >
                      {isNum && typeof val === 'number' && Math.abs(val) > 1000 && (
                        <span className={`text-xs mr-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                          {val >= 0 ? '' : '−'}
                        </span>
                      )}
                      {formatValue(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-between px-5 py-3 ${
          isDark ? 'border-t border-slate-800/60' : 'border-t border-slate-200/60'
        }`}>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isDark
                  ? 'text-slate-500 hover:text-white hover:bg-slate-800 disabled:opacity-30'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30'
              }`}
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono transition-all ${
                    p === page
                      ? isDark
                        ? 'bg-amber-400/20 text-amber-400'
                        : 'bg-indigo-100 text-indigo-600'
                      : isDark
                        ? 'text-slate-600 hover:text-white hover:bg-slate-800'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p + 1}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isDark
                  ? 'text-slate-500 hover:text-white hover:bg-slate-800 disabled:opacity-30'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
