export const metadata = {
  title: 'Fast & Safe URL Shortener | Free Link Management & Analytics',
  description: 'Shorten long URLs into clean, shareable links with instant safety verification, click tracking, and QR codes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 text-slate-800 font-sans antialiased">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-extrabold text-rose-600 tracking-tight">
              Linkking<span className="text-slate-800">.ly</span>
            </a>
            <nav className="space-x-5 text-sm font-medium text-slate-600">
              <a href="/" className="hover:text-rose-600">Home</a>
              <a href="#features" className="hover:text-rose-600">Features</a>
              <a href="#blog" className="hover:text-rose-600">Blog</a>
              <a href="#privacy" className="hover:text-rose-600">Privacy</a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-slate-900 text-slate-300 py-10 mt-16">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
            <p className="text-sm">© 2026 Linkking.ly — Safe & Permanent URL Shortener.</p>
            <div className="flex justify-center space-x-6 text-xs text-slate-400">
              <a href="#privacy" className="hover:text-white">Privacy Policy</a>
              <a href="#terms" className="hover:text-white">Terms of Service</a>
              <a href="#abuse" className="hover:text-white">Report Abuse</a>
              <a href="#contact" className="hover:text-white">Contact Us</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
    }
    
