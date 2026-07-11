'use client';
import {FormEvent,useEffect,useState} from "react";
import {supabase} from "@/lib/supabase";

export default function PostJob(){
  const [categories,setCategories]=useState<any[]>([]),[message,setMessage]=useState("");
  useEffect(()=>{supabase.from("categories").select("id,name").eq("is_active",true).order("name").then(({data})=>setCategories(data||[]))},[]);
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setMessage("Publishing…");
    const {data:{user}}=await supabase.auth.getUser();if(!user){setMessage("Please log in first.");return}
    const f=new FormData(e.currentTarget),since=new Date(Date.now()-86400000).toISOString();
    const [{count},{data:profile}]=await Promise.all([
      supabase.from("jobs").select("*",{count:"exact",head:true}).eq("poster_id",user.id).gte("created_at",since),
      supabase.from("profiles").select("is_premium").eq("id",user.id).single()
    ]);
    if(!profile?.is_premium&&(count||0)>=2){setMessage("Free plan limit reached: 2 jobs in 24 hours.");return}
    const {error}=await supabase.from("jobs").insert({
      poster_id:user.id,category_id:Number(f.get("category_id")),title:f.get("title"),description:f.get("description"),
      city:f.get("city"),state:f.get("state"),zip_code:f.get("zip_code"),budget_amount:Number(f.get("budget")),
      payment_type:f.get("payment_type"),date_needed:f.get("date_needed")||null,workers_needed:Number(f.get("workers")),status:"open"
    });
    setMessage(error?error.message:"Job published successfully.");if(!error)e.currentTarget.reset()
  }
  return <main className="section soft"><div className="shell formWrap"><div className="formCard">
    <div className="eyebrow">Create a listing</div><h2>Post a job</h2><div className="notice">Free users may post 2 jobs every rolling 24 hours.</div>
    <form className="formGrid" onSubmit={submit}>
      <label className="full">Job title<input required minLength={5} name="title"/></label>
      <label>Category<select required name="category_id"><option value="">Choose</option>{categories.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label>
      <label>Budget<input required min="1" type="number" name="budget"/></label>
      <label>Payment type<select name="payment_type"><option value="fixed">Fixed</option><option value="hourly">Hourly</option></select></label>
      <label>Workers needed<input type="number" min="1" max="20" defaultValue="1" name="workers"/></label>
      <label>City<input required name="city"/></label><label>State<input maxLength={2} name="state" placeholder="TX"/></label>
      <label>ZIP code<input name="zip_code"/></label><label>Date needed<input type="date" name="date_needed"/></label>
      <label className="full">Description<textarea required minLength={20} maxLength={2000} rows={6} name="description"/></label>
      <label className="full" style={{flexDirection:"row"}}><input required type="checkbox"/> This job is legal and follows BukuTask rules.</label>
      {message&&<div className={`notice full ${message.includes("successfully")?"success":""}`}>{message}</div>}
      <button className="btn full">Publish job</button>
    </form>
  </div></div></main>
}
