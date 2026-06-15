"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { MessageSquare, X, Send, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type Testimonial = {
  id: string;
  name: string;
  company: string;
  message: string;
  created_at: string;
};

export function ClientSuccessWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({ name: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time listener for testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (!error && data) {
        setMessages(data as Testimonial[]);
      }
    };

    fetchTestimonials();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    // Set up realtime subscription
    const channel = supabase
      .channel('public:testimonials')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, (payload) => {
        // Simple approach: Refetch on any change to keep logic simple
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ name: '', company: '', message: '' });
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-[350px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[var(--color-accent)] p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">Client Success</h3>
                <p className="text-xs opacity-90">Trusted by industry leaders</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-[var(--color-background)]">
              {messages.length === 0 ? (
                <div className="text-center text-[var(--color-muted)] text-sm mt-10">
                  Be the first to share your experience!
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                    <div className="flex items-center gap-1 mb-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />)}
                    </div>
                    <p className="text-sm text-[var(--color-text)] mb-2">"{msg.message}"</p>
                    <p className="text-xs text-[var(--color-muted)] font-medium">
                      — {msg.name} {msg.company && <span className="opacity-75">({msg.company})</span>}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-1/2 px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company (Opt)"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-1/2 px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Write a trusted review..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2 pr-10 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] resize-none"
                    rows={2}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.message}
                    className="absolute right-2 bottom-3 text-[var(--color-accent)] disabled:opacity-50 hover:opacity-80"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[var(--color-accent)] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
