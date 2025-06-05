"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type Newsletter = {
  id: string;
  title: string;
  body: string;
  updated_at: string;
};

export default function Newsletter() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: any;
    async function fetchLatest() {
      setLoading(true);
      // Get the latest newsletter by updated_at
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) setNewsletter(data[0]);
      setLoading(false);
    }
    fetchLatest();
    // Real-time subscription
    subscription = supabase
      .channel('public:newsletters')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'newsletters' }, (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
        fetchLatest();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading newsletter...</div>;
  if (!newsletter) return <div className="py-8 text-center text-gray-500">No newsletter available.</div>;

  return (
    <section className="max-w-2xl mx-auto my-12 p-6 rounded-xl bg-white/80 shadow-lg backdrop-blur-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-3 text-primary">{newsletter.title}</h2>
      <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: newsletter.body }} />
      <div className="mt-4 text-xs text-right text-gray-400">Last updated: {new Date(newsletter.updated_at).toLocaleString()}</div>
    </section>
  );
}
