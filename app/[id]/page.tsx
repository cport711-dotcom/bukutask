'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase
        .from("jobs")
        .select("id,title,description,city,state,budget_amount,payment_type,date_needed,workers_needed,categories(name)")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) setMessage(error.message);
      else setJobs(data || []);

      setLoading(false);
    }

    loadJobs();
  }, []);

  const shown = jobs.filter((job) =>
    JSON.stringify(job).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="section soft">
      <div className="shell">
        <div className="sectionTop">
          <div>
            <div className="eyebrow">Available work</div>
            <h2>Browse jobs</h2>
          </div>
        </div>

        <input
          style={{ width: "100%", marginBottom: 22 }}
          placeholder="Search jobs, category, or city"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        {message && <div className="notice">{message}</div>}

        {loading ? (
          <div className="loading">Loading jobs…</div>
        ) : shown.length === 0 ? (
          <div className="empty">No open jobs yet.</div>
        ) : (
          <div className="grid">
            {shown.map((job) => (
              <article className="card" key={job.id}>
                <span className="tag">{job.categories?.name || "Other"}</span>
                <h3>{job.title}</h3>
                <p>{job.description}</p>

                <div className="jobMeta">
                  <span>📍 {job.city}{job.state ? `, ${job.state}` : ""}</span>
                  <span>👥 {job.workers_needed}</span>
                </div>

                <div className="price">
                  ${Number(job.budget_amount).toLocaleString()}
                  {job.payment_type === "hourly" ? "/hr" : ""}
                </div>

                <Link
                  className="btn"
                  href={`/jobs/${job.id}`}
                  style={{ marginTop: 16, width: "100%" }}
                >
                  Open job
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
