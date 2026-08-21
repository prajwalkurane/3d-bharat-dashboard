'use client';

import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('3d-bharat-theme');
    const next = saved || 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('3d-bharat-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        {mobileOpen ? <div className="fixed inset-0 z-30 bg-slate-900/50 md:hidden" onClick={() => setMobileOpen(false)} /> : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuToggle={() => setMobileOpen((current) => !current)} theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
