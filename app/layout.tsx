import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BukuTask",
  description: "Post it. Find help. Get it done."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>
    <header className="header"><div className="shell nav">
      <Link href="/" className="brand"><span>B</span>BukuTask</Link>
      <nav>
        <Link href="/jobs">Browse Jobs</Link>
        <Link href="/post-job">Post a Job</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login" className="btn small">Log in</Link>
      </nav>
    </div></header>
    {children}
    <footer><div className="shell footer">
      <div><strong>BukuTask</strong><p>Post it. Find help. Get it done.</p></div>
      <div><Link href="/jobs">Browse jobs</Link><Link href="/post-job">Post a job</Link></div>
      <div><a href="mailto:knockleheadno@yahoo.com">Contact</a><a href="https://www.paypal.com/" target="_blank">Support with PayPal</a></div>
    </div></footer>
  </body></html>;
}
