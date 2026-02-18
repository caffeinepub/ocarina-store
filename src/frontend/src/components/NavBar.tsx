import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useAdminStatus } from '../hooks/useAdminStatus';
import { Button } from '@/components/ui/button';
import { Shield, User, LogOut, LogIn } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import ProfileSetupModal from './ProfileSetupModal';

export default function NavBar() {
  const navigate = useNavigate();
  const { identity, clear, login, isLoggingIn } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { isAdmin, isLoading: adminLoading } = useAdminStatus();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
            >
              <Shield className="h-6 w-6 text-primary" />
              <span>Ocarina Store Admin</span>
            </button>
          </div>

          <nav className="flex items-center gap-4">
            {isAuthenticated && isAdmin && !adminLoading && (
              <Button
                variant="ghost"
                onClick={() => navigate({ to: '/admin' })}
                className="gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            )}

            {isAuthenticated && userProfile && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
                <User className="h-4 w-4" />
                <span>{userProfile.name}</span>
              </div>
            )}

            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              variant={isAuthenticated ? 'outline' : 'default'}
              className="gap-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                  Logging in...
                </>
              ) : isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </nav>
        </div>
      </header>

      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

