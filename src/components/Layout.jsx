import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useLenis } from '@/hooks/useLenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CookieConsent from '@/components/CookieConsent';
import SkipLink from '@/components/SkipLink';
import FloatingChatWidget from '@/components/FloatingChatWidget';

const CustomCursor = lazy(() => import('@/components/CustomCursor'));

export default function Layout() {
  useLenis();

  return (
    <div className="noise-overlay relative min-h-screen bg-background">
      <SkipLink />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <FloatingChatWidget />
    </div>
  );
}
