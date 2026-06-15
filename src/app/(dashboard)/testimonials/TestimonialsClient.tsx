"use client";

import { useState } from "react";
import { Trash2, Edit2, X, Check } from "lucide-react";

export function TestimonialsClient({ initialData }: { initialData: any[] }) {
  const [testimonials, setTestimonials] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", company: "", message: "" });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial");
    } finally {
      setIsDeleting(null);
    }
  };

  const startEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setEditForm({
      name: testimonial.name || "",
      company: testimonial.company || "",
      message: testimonial.message || ""
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    
    try {
      const res = await fetch(`/api/testimonials/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (res.ok) {
        setTestimonials(testimonials.map(t => 
          t.id === editingId ? { ...t, ...editForm } : t
        ));
        setEditingId(null);
      } else {
        alert("Failed to update testimonial");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating testimonial");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Testimonials</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Manage feedback from your clients.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-2 shadow-sm">
          <span className="text-sm font-medium text-[var(--color-muted)]">Total Feedback: </span>
          <span className="text-lg font-bold text-[var(--color-accent)]">{testimonials.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full p-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-center text-[var(--color-muted)]">
            <p>No testimonials found yet.</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm flex flex-col relative group">
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingId !== testimonial.id && (
                  <>
                    <button onClick={() => startEdit(testimonial)} className="p-2 bg-[var(--color-background)] rounded-md border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(testimonial.id)} disabled={isDeleting === testimonial.id} className="p-2 bg-[var(--color-background)] rounded-md border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-500 transition-colors disabled:opacity-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {editingId === testimonial.id ? (
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-[var(--color-text)] text-lg">Edit Testimonial</h3>
                    <div className="flex gap-2">
                      <button onClick={handleSaveEdit} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors" title="Save">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors" title="Cancel">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Message</label>
                    <textarea 
                      value={editForm.message}
                      onChange={(e) => setEditForm({...editForm, message: e.target.value})}
                      className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] resize-none h-24"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Name</label>
                      <input 
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Company</label>
                      <input 
                        value={editForm.company}
                        onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                        className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[var(--color-text)] mb-6 text-sm italic leading-relaxed flex-grow">
                    "{testimonial.message}"
                  </div>
                  <div className="mt-auto border-t border-[var(--color-border)] pt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] font-bold text-lg">
                      {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div>
                      <div className="font-bold text-[var(--color-text)] text-sm">{testimonial.name || 'Anonymous'}</div>
                      {testimonial.company && (
                        <div className="text-xs text-[var(--color-muted)] font-medium mt-0.5">{testimonial.company}</div>
                      )}
                    </div>
                    <div className="ml-auto text-xs text-[var(--color-muted)]">
                      {new Date(testimonial.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
