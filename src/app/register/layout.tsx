import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'HealthSync Appointments',
  description: 'Modern hospital appointment management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t py-8 bg-card text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HealthSync Appointments. All rights reserved.</p>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
