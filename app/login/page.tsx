'use client';
import {FormEvent,useState} from "react";
import {supabase} from "@/lib/supabase";

export default function Login(){
  const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[signup,setSignup]=useState(false),[message,setMessage]=useState("");
  async function submit(e:FormEvent){e.preventDefault();setMessage("Working…");
    const result=signup?await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${location.origin}/auth/callback`}}):await supabase.auth.signInWithPassword({email,password});
    setMessage(result.error?result.error.message:(signup?"Check your email to confirm your account.":"Logged in."));
    if(!result.error&&!signup)location.href="/dashboard";
  }
  async function oauth(provider:"google"|"facebook"){const {error}=await supabase.auth.signInWithOAuth({provider,options:{redirectTo:`${location.origin}/auth/callback`}});if(error)setMessage(error.message)}
  return <main className="section soft"><div className="shell"><div className="formCard loginCard center">
    <div className="eyebrow">Welcome</div><h2>{signup?"Create account":"Log in"}</h2>
    <button className="social" onClick={()=>oauth("google")}>Continue with Google</button>
    <button className="social" onClick={()=>oauth("facebook")}>Continue with Facebook</button>
    <form onSubmit={submit}><label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><br/>
    <label>Password<input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label>
    {message&&<div className="notice">{message}</div>}<button className="btn" style={{width:"100%",marginTop:15}}>{signup?"Create account":"Log in"}</button></form>
    <button className="social" onClick={()=>setSignup(!signup)}>{signup?"Already have an account? Log in":"Create a free account"}</button>
  </div></div></main>
}
