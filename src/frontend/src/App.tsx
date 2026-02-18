import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import AppLayout from './components/AppLayout';
import AdminDashboard from './pages/AdminDashboard';
import AccessDenied from './pages/AccessDenied';
import Home from './pages/Home';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute, accessDeniedRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

