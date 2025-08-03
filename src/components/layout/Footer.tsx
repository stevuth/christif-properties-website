export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Terra Abode. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
