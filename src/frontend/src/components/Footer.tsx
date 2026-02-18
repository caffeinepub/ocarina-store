import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <footer className="border-t bg-muted/30 py-6 mt-auto">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            © {currentYear} Ocarina Store Admin. Built with{' '}
            <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

