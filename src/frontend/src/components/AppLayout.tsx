import { Outlet } from '@tanstack/react-router';
import NavBar from './NavBar';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

