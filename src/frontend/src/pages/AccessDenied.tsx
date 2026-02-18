import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Home } from 'lucide-react';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-destructive/10">
                <ShieldAlert className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription className="text-base mt-2">
                You don't have permission to access this page
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted text-sm">
              <p className="font-medium mb-2">Why am I seeing this?</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• This page requires admin privileges</li>
                <li>• Your account doesn't have the necessary permissions</li>
                <li>• Contact an administrator if you believe this is an error</li>
              </ul>
            </div>
            <div className="flex justify-center pt-2">
              <Button onClick={() => navigate({ to: '/' })} className="gap-2">
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

