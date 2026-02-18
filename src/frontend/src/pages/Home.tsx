import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAdminStatus } from '../hooks/useAdminStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Package, LogIn } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { isAdmin, isLoading: adminLoading } = useAdminStatus();

  const isAuthenticated = !!identity;

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Ocarina Store Admin</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your product catalog with ease. Add, edit, and organize your products in one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Full control over your inventory</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Add new products with detailed information
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Edit existing product details
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Manage pricing and descriptions
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Admin Access</CardTitle>
                  <CardDescription>Secure role-based permissions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Internet Identity authentication
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Admin-only dashboard access
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Protected product operations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-4">
          {!isAuthenticated ? (
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 text-center space-y-4">
                <LogIn className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-medium">Login Required</p>
                  <p className="text-sm text-muted-foreground">
                    Please login with Internet Identity to access the admin dashboard
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : isAdmin && !adminLoading ? (
            <Button size="lg" onClick={() => navigate({ to: '/admin' })} className="gap-2">
              <Shield className="h-5 w-5" />
              Go to Admin Dashboard
            </Button>
          ) : !adminLoading ? (
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 text-center space-y-4">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-medium">Admin Access Required</p>
                  <p className="text-sm text-muted-foreground">
                    You need admin privileges to access the dashboard
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

