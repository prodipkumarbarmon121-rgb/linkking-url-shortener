import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Safe Link Preview & Redirect | Linkking.ly',
  description: 'Verify destination URL before continuing to protect your browsing safety.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function RedirectPreviewPage({ params }) {
  const { slug } = params;

  const { data: link } = await supabase
    .from('links')
    .select('*')
    .eq('short_slug', slug)
    .single();

  if (!link) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Link Not Found</h1>
        <p className="text-slate-600 mb-6">
          This short URL does not exist or may have been removed due to safety or policy violations.
        </p>
        <a
          href="/"
          className="inline-block bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold"
        >
          Create a New Short Link
        </a>
      </div>
    );
  }

  await supabase
    .from('links')
    .update({ clicks: (link.clicks || 0) + 1 })
    .eq('id', link.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-6">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
          Verified Link Preview • {link.clicks + 1} Total Views
        </span>

        <h1 className="text-2xl font-bold text-slate-900">
          You are about to visit an external link
        </h1>
        <p className="text-sm text-slate-600">
          For your online safety, please review the destination address below before proceeding:
        </p>

        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-800 break-all">
          {link.original_url}
        </div>

        <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs text-slate-400">
          Advertisement Space (AdSense Responsive Unit)
        </div>

        <div className="pt-2">
          <a
            href={link.original_url}
            rel="nofollow noopener noreferrer"
            className="inline-block w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-sm"
          >
            Continue to Destination →
          </a>
        </div>

        <p className="text-xs text-slate-400 pt-4">
          Suspicious or unsafe link?{' '}
          <a href="/#abuse" className="underline hover:text-slate-600">
            Report Abuse
          </a>
        </p>
      </div>
    </div>
  );
      }
            
