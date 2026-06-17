"use client";

import { useState } from "react";
import { Trash2, Edit2, X, Check, Plus } from "lucide-react";

export function ClientsClient({ initialData }: { initialData: any[] }) {
  const [clients, setClients] = useState(initialData);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", logo_url: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", logo_url: "" });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim()) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });
      const json = await res.json();
      
      if (res.ok) {
        setClients([json.client, ...clients]);
        setIsAdding(false);
        setAddForm({ name: "", logo_url: "" });
      } else {
        alert("Failed to add client: " + json.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding client");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setClients(clients.filter(c => c.id !== id));
      } else {
        alert("Failed to delete client");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting client");
    } finally {
      setIsDeleting(null);
    }
  };

  const startEdit = (client: any) => {
    setEditingId(client.id);
    setEditForm({
      name: client.name || "",
      logo_url: client.logo_url || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    
    try {
      const res = await fetch(`/api/clients/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (res.ok) {
        setClients(clients.map(c => 
          c.id === editingId ? { ...c, ...editForm } : c
        ));
        setEditingId(null);
      } else {
        alert("Failed to update client");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating client");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Clients</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Manage client logos for the 'Trusted By' section.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> Add Client
        </button>
      </div>

      {isAdding && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-[var(--color-text)] text-lg mb-4">Add New Client</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Client Name (Required)</label>
                <input 
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                  className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)]"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Logo URL (Optional)</label>
                <input 
                  value={addForm.logo_url}
                  onChange={(e) => setAddForm({...addForm, logo_url: e.target.value})}
                  className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)]"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-medium text-[var(--color-text)] bg-gray-100 rounded-lg hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" disabled={isSaving || !addForm.name} className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent)] rounded-lg hover:opacity-90 disabled:opacity-50">
                {isSaving ? "Saving..." : "Save Client"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.length === 0 ? (
          <div className="col-span-full p-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-center text-[var(--color-muted)]">
            <p>No clients added yet.</p>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm flex flex-col relative group">
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingId !== client.id && (
                  <>
                    <button onClick={() => startEdit(client)} className="p-2 bg-[var(--color-background)] rounded-md border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(client.id)} disabled={isDeleting === client.id} className="p-2 bg-[var(--color-background)] rounded-md border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-500 transition-colors disabled:opacity-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {editingId === client.id ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-[var(--color-text)] text-sm">Edit Client</h3>
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
                    <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Name</label>
                    <input 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-muted)] block mb-1">Logo URL</label>
                    <input 
                      value={editForm.logo_url}
                      onChange={(e) => setEditForm({...editForm, logo_url: e.target.value})}
                      className="w-full text-sm p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)]"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                    {client.logo_url ? (
                      <img src={client.logo_url} alt={client.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-2xl font-bold text-[var(--color-muted)]">{client.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-text)]">{client.name}</div>
                    <div className="text-xs text-[var(--color-muted)] mt-1">
                      Added: {new Date(client.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
