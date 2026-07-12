'use client';

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PostJob() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name")
        .eq("is_active", true)
        .order("name");

      if (error) {
        setMessage(`Category error: ${error.message}`);
        return;
      }

      setCategories(data || []);
    }

    loadCategories();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (publishing) return;

    setPublishing(true);
    setMessage("Publishing…");

    const formElement = e.currentTarget;

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      const user = session?.user;

      if (!user) {
        setMessage("Please log in first.");
        return;
      }

      const form = new FormData(formElement);
      const since = new Date(Date.now() - 86_400_000).toISOString();

      const { count, error: countError } = await supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
        .eq("poster_id", user.id)
        .gte("created_at", since);

      if (countError) {
        throw new Error(`Could not check posting limit: ${countError.message}`);
      }

      if ((count || 0) >= 2) {
        setMessage("Free plan limit reached: 2 jobs in 24 hours.");
        return;
      }

      const payload = {
        poster_id: user.id,
        category_id: Number(form.get("category_id")),
        title: String(form.get("title") || "").trim(),
        description: String(form.get("description") || "").trim(),
        city: String(form.get("city") || "").trim(),
        state: String(form.get("state") || "").trim() || null,
        zip_code: String(form.get("zip_code") || "").trim() || null,
        budget_amount: Number(form.get("budget")),
        payment_type: String(form.get("payment_type") || "fixed"),
        date_needed: form.get("date_needed") || null,
        workers_needed: Number(form.get("workers") || 1),
        status: "open",
      };

      const { error: insertError } = await supabase
        .from("jobs")
        .insert(payload);

      if (insertError) {
        throw new Error(insertError.message);
      }

      formElement.reset();
      setMessage("Job published successfully.");

      setTimeout(() => {
        router.push("/jobs");
        router.refresh();
      }, 700);
    } catch (error) {
      const text =
        error instanceof Error ? error.message : "Unknown publishing error.";
      setMessage(`Could not publish job: ${text}`);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <main className="section soft">
      <div className="shell formWrap">
        <div className="formCard">
          <div className="eyebrow">Create a listing</div>
          <h2>Post a job</h2>

          <div className="notice">
            Free users may post 2 jobs every rolling 24 hours.
          </div>

          <form className="formGrid" onSubmit={submit}>
            <label className="full">
              Job title
              <input required minLength={5} name="title" />
            </label>

            <label>
              Category
              <select required name="category_id">
                <option value="">Choose</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Budget
              <input required min="1" type="number" name="budget" />
            </label>

            <label>
              Payment type
              <select name="payment_type">
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
              </select>
            </label>

            <label>
              Workers needed
              <input
                type="number"
                min="1"
                max="20"
                defaultValue="1"
                name="workers"
              />
            </label>

            <label>
              City
              <input required name="city" />
            </label>

            <label>
              State
              <input maxLength={2} name="state" placeholder="TX" />
            </label>

            <label>
              ZIP code
              <input name="zip_code" />
            </label>

            <label>
              Date needed
              <input type="date" name="date_needed" />
            </label>

            <label className="full">
              Description
              <textarea
                required
                minLength={20}
                maxLength={2000}
                rows={6}
                name="description"
              />
            </label>

            <label className="full" style={{ flexDirection: "row" }}>
              <input required type="checkbox" /> This job is legal and follows
              BukuTask rules.
            </label>

            {message && (
              <div
                className={`notice full ${
                  message.includes("successfully") ? "success" : ""
                }`}
              >
                {message}
              </div>
            )}

            <button className="btn full" disabled={publishing}>
              {publishing ? "Publishing…" : "Publish job"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
