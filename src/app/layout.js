import { Providers } from './providers';
import './globals.css';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const metadata = {
  title: '3D Bharat Investment Dashboard',
  description: 'Investment dashboard for investors and corporates across India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}
