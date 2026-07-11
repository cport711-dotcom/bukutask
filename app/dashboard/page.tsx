'use client';
import {useEffect,useState} from "react";
import Link from "next/link";
import {supabase} from "@/lib/supabase";

export default function Dashboard(){
  const [user,setUser]=useState<any>(null),[jobs,setJobs]=useState<any[]>([]),[loading,setLoading]=useState(true);
  useEffect(()=>{(async()=>{const {data}=await supabase.auth.getUser();setUser(data.user);if(data.user){const {data:j}=await supabase.from("jobs").select("id,title,status,budget_amount").eq("poster_id",data.user.id).order("created_at",{ascending:false});setJobs(j||[])}setLoading(false)})()},[]);
  if(loading)return <main className="loading">Loading dashboard…</main>;
  if(!user)return <main className="section"><div className="shell empty"><h2>Please log in</h2><Link className="btn" href="/login">Log in</Link></div></main>;
  return <main className="section soft"><div className="shell">
    <div className="sectionTop"><div><div className="eyebrow">Your account</div><h2>Dashboard</h2></div><button className="btn secondary" onClick={async()=>{await supabase.auth.signOut();location.href="/"}}>Log out</button></div>
    <div className="dashboard"><div className="card"><div className="stat">{jobs.length}</div><p>Jobs posted</p></div><div className="card"><div className="stat">{jobs.filter(j=>j.status==="open").length}</div><p>Open jobs</p></div><div className="card"><div className="stat">Free</div><p>Membership</p></div></div>
    <div className="sectionTop" style={{marginTop:40}}><h2>Your listings</h2><Link className="btn" href="/post-job">Post a job</Link></div>
    {jobs.length===0?<div className="empty">No jobs posted yet.</div>:<div className="grid">{jobs.map(j=><div className="card" key={j.id}><span className="tag">{j.status}</span><h3>{j.title}</h3><div className="price">${Number(j.budget_amount).toLocaleString()}</div></div>)}</div>}
  </div></main>
}
