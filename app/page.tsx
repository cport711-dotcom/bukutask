import Link from "next/link";

export default function Home(){
  return <main>
    <section className="hero"><div className="shell heroGrid">
      <div><div className="eyebrow">Local help. Real opportunities.</div>
      <h1>Post it. Find help. <em>Get it done.</em></h1>
      <p className="lead">BukuTask connects people and businesses with independent local workers for jobs big and small.</p>
      <div className="actions"><Link className="btn" href="/post-job">Post a Job</Link><Link className="btn secondary" href="/jobs">Find Work</Link></div>
      <div className="trust"><span>✓ Verified profiles</span><span>✓ Secure accounts</span><span>✓ Real reviews</span></div></div>
      <div className="preview"><strong>Jobs near you</strong>
        <div className="mini"><div><b>Move a sofa upstairs</b><span>Houston, TX</span></div><b>$75</b></div>
        <div className="mini"><div><b>Set up home Wi-Fi</b><span>Spring, TX</span></div><b>$60</b></div>
        <div className="mini"><div><b>Front yard cleanup</b><span>Katy, TX</span></div><b>$120</b></div>
      </div>
    </div></section>
    <section className="section"><div className="shell">
      <div className="sectionTop"><div><div className="eyebrow">Simple process</div><h2>How BukuTask works</h2></div></div>
      <div className="grid">
        <div className="card"><span className="tag">STEP 1</span><h3>Post your job</h3><p>Describe the work, location, schedule, and budget.</p></div>
        <div className="card"><span className="tag">STEP 2</span><h3>Review applicants</h3><p>Compare profiles, experience, ratings, and messages.</p></div>
        <div className="card"><span className="tag">STEP 3</span><h3>Get it done</h3><p>Complete the job and leave a verified two-way review.</p></div>
      </div>
    </div></section>
    <section className="section soft"><div className="shell"><div className="card"><div className="eyebrow">Premium</div><h2>$9.99 per month</h2><p>Unlimited job listings, featured placement, reusable templates, and priority support. PayPal billing must be connected before live payments.</p></div></div></section>
  </main>
}
