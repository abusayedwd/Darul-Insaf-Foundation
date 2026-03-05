import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingDonateButton } from '../components/FloatingDonateButton';
import { CookieConsent } from '../components/CookieConsent';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif' 
});

export const metadata: Metadata = {
  title: 'Al-Insaf Foundation | Serving Humanity',
  description: 'Bringing Justice & Relief to the Vulnerable',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <AppProvider>
          <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-main)' }}>
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
            <FloatingDonateButton />
            <CookieConsent />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
