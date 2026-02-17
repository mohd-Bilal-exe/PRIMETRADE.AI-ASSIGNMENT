import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/lib/components/ThemeProvider';
import { Bounce, ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrimeTrade.ai',
  description: 'AI-Powered Trading Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          
        >
          {children}
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
              />
        </ThemeProvider>
      </body>
    </html>
  );
}
