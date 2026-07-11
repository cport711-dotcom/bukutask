'use client';
import {useEffect,useState} from "react";
import {supabase} from "@/lib/supabase";

export default function Jobs(){
  const [jobs,setJobs]=useState<any[]>([]),[loading,setLoading]=useState(true),[q,setQ]=useState("");
  useEffect(()=>{(async()=>{const {data}=await supabase.from("jobs").select("id,title,description,city,state,budget_amount,payment_type,date_needed,workers_needed,categories(name)").eq("status","open").order("created_at",{ascending:false});setJobs(data||[]);setLoading(false)})()},[]);
  const shown=jobs.filter(j=>JSON.stringify(j).toLowerCase().includes(q.toLowerCase()));
  return <main className="section soft"><div className="shell"><div className="sectionTop"><div><div className="eyebrow">Available work</div><h2>Browse jobs</h2></div></div>
    <input style={{width:"100%",marginBottom:22}} placeholder="Search jobs, category, or city" value={q} onChange={e=>setQ(e.target.value)}/>
    {loading?<div className="loading">Loading jobs…</div>:shown.length===0?<div className="empty">No open jobs yet.</div>:<div className="grid">{shown.map(j=><article className="card" key={j.id}>
      <span className="tag">{j.categories?.name||"Other"}</span><h3>{j.title}</h3><p>{j.description}</p>
      <div className="jobMeta"><span>📍 {j.city}{j.state?`, ${j.state}`:""}</span><span>👥 {j.workers_needed}</span></div>
      <div className="price">${Number(j.budget_amount).toLocaleString()}{j.payment_type==="hourly"?"/hr":""}</div>
    </article>)}</div>}
  </div></main>
}
