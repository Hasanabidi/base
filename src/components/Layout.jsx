import { Outlet } from 'react-router-dom';
import { useLenis } from '@/hooks/useLenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

export default function Layout() {
  useLenis();

  return (
    <div className="noise-overlay relative min-h-screen bg-background">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}