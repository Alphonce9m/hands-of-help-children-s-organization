"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../src/lib/supabaseClient';

export default function NewsletterAdminPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLatest() {
      const { data } = await supabase
        .from('newsletters')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        setTitle(data[0].title || '');
        setBody(data[0].body || '');
      }
    }
    fetchLatest();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    // Upsert newsletter (always keep just one latest)
    const { error } = await supabase
      .from('newsletters')
      .upsert(
        { 
          id: 'latest', // Use a constant ID to ensure we only keep one newsletter
          title, 
          body, 
          updated_at: new Date().toISOString() 
        },
        { 
          onConflict: 'id' // This ensures we only keep one newsletter
        }
      );
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true);
  }

  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [adminSecret, setAdminSecret] = useState('');

  async function handleSendNewsletter() {
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: adminSecret }),
      });
      const data = await res.json();
      if (res.ok) {
        setSendResult(`Sent to ${data.sent} subscribers${data.failed ? ", failed: " + data.failed : ''}`);
      } else {
        setSendResult(data.error || 'Failed to send newsletter');
      }
    } catch (err) {
      setSendResult('Failed to send newsletter');
    }
    setSending(false);
  }

  return (
    <main className="max-w-xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-primary">Edit Newsletter</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full px-3 py-2 border rounded min-h-[140px]"
          placeholder="Newsletter content (HTML allowed)"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Newsletter'}
        </button>
        {success && <div className="text-green-600">Newsletter updated!</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <hr className="my-8" />
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Send Newsletter to Subscribers</h2>
        <input
          className="w-full px-3 py-2 border rounded"
          type="password"
          placeholder="Admin Secret"
          value={adminSecret}
          onChange={e => setAdminSecret(e.target.value)}
        />
        <button
          onClick={handleSendNewsletter}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          disabled={sending || !adminSecret}
        >
          {sending ? 'Sending...' : 'Send Newsletter'}
        </button>
        {sendResult && <div className="mt-2 text-blue-600">{sendResult}</div>}
      </div>
    </main>
  );
}
