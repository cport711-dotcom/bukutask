'use client';
import {useEffect} from "react";
import {supabase} from "@/lib/supabase";
export default function Callback(){useEffect(()=>{supabase.auth.getSession().then(()=>location.href="/dashboard")},[]);return <main className="loading">Finishing login…</main>}
