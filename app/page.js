'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSlug = () => Math.random().toString(36).substring(2, 8);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setLoading(true);
    const slug = alias.trim() ? alias.trim().replace(/[^a-zA-Z0-9-_]/g, '') : generateSlug();

    const { error: dbError } = await supabase
      .from('links')
      .insert([{ original_url: url.trim(), short_slug: slug }]);

    setLoading(false);

    if (dbError) {
      if (dbError.code === '23505') {
        setError('This custom alias is already taken. Please try another one.');
      } else {
        setError('Something went wrong. Please check your database connection.');
      }
      return;
    }

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setShortUrl(`${origin}/${slug}`);
    setUrl('');
    setAlias('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero & Shortener Box */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-teal-50 p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Shorten Your Links. <span className="text-rose-600">Keep Them Forever.</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Create clean, permanent, and trackable short URLs in seconds. Built with real-time link safety checks for social media, blogs, and business campaigns.
          </p>
        </div>

        <form onSubmit={handleShorten} className="space-y-4 max-w-xl mx-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Destination URL *</label>
            <input
              type="url"
              required
              placeholder="https://example.com/very-long-article-link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Custom Alias (Optional)</label>
            <input
              type="text"
              placeholder="my-offer-2026"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
            />
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-sm"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 max-w-xl mx-auto bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <a href={shortUrl} target="_blank" rel="noreferrer" className="text-emerald-800 font-semibold break-all">
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shrink-0"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        )}
      </section>

      {/* AdSense Placeholder Slot */}
      <div className="my-10 p-4 bg-slate-100 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-400">
        Advertisement Space (AdSense Responsive Unit)
      </div>

      {/* Features Section for AdSense Value */}
      <section id="features" className="my-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Permanent Links</h3>
          <p className="text-sm text-slate-600">Unlike temporary demo tools, your shortened links are stored permanently in cloud databases and never expire.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Safe Preview Redirect</h3>
          <p className="text-sm text-slate-600">Every link goes through a transparent destination preview page so visitors know exactly where they are heading.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Click Analytics</h3>
          <p className="text-sm text-slate-600">Real-time click counting helps creators and marketers measure link engagement accurately.</p>
        </div>
      </section>

      {/* Blog / Guides Section (Essential for AdSense Approval) */}
      <section id="blog" className="my-14 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Link Management & Digital Safety Guides</h2>
        <article className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-lg font-bold text-slate-800">Why Short URLs Improve Social Media Click-Through Rates</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Long URLs filled with tracking parameters often look cluttered and untrustworthy on social platforms. Using a clean, custom alias makes your links readable, memorable, and easier to share across mobile devices, bios, and video descriptions.
          </p>
        </article>
        <article className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-lg font-bold text-slate-800">How Link Preview Pages Protect Users from Phishing</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Blind redirects can sometimes hide malicious destinations. A safe intermediate preview page displays the full destination domain before redirecting, giving users full transparency and control over their browsing security.
          </p>
        </article>
      </section>

      {/* Legal & Policy Section */}
      <section id="privacy" className="my-12 bg-white p-6 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-3">
        <h3 className="text-base font-bold text-slate-800">Privacy Policy, Terms & Abuse Prevention</h3>
        <p id="terms">
          <strong>Terms of Service:</strong> Linkking.ly prohibits shortening links related to malware, phishing, spam, copyright infringement, or illegal content. Violating links are permanently removed without notice.
        </p>
        <p>
          <strong>Privacy & Cookies:</strong> We collect minimal non-personal click metrics to maintain link analytics. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website.
        </p>
        <p id="abuse">
          <strong>Report Abuse & Contact:</strong> To report a suspicious short link or contact our moderation team, email us at <em>support@yourdomain.com</em>.
        </p>
      </section>
    </div>
  );
}
