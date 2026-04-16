import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DataTable from "@/components/admin/DataTable";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerTitle, setSpeakerTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    setEvents(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!title || !eventDate) { toast.error("Title and date required"); return; }
    setSaving(true);
    const { error } = await supabase.from("events").insert({
      title, slug: slugify(title), description: description || null,
      event_date: eventDate, duration: duration || null,
      speaker_name: speakerName || null, speaker_title: speakerTitle || null,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Event created!");
    setTitle(""); setDescription(""); setEventDate(""); setDuration("");
    setSpeakerName(""); setSpeakerTitle(""); setShowForm(false);
    load();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    toast.success("Event deleted");
    load();
  };

  const columns = [
    { header: "Title", accessor: (r: any) => <span className="font-medium text-foreground">{r.title}</span> },
    { header: "Date", accessor: (r: any) => new Date(r.event_date).toLocaleDateString() },
    { header: "Speaker", accessor: (r: any) => r.speaker_name || "—" },
    { header: "Duration", accessor: (r: any) => r.duration || "—" },
    {
      header: "",
      accessor: (r: any) => (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleDelete(r.id, e)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
      className: "w-16",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Events</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> New Event</Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <Input placeholder="Event title..." value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background/50 text-lg font-heading" />
          <Textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="bg-background/50" />
          <div className="grid grid-cols-2 gap-4">
            <Input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="bg-background/50" />
            <Input placeholder="Duration (e.g. 90 min)" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-background/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Speaker name" value={speakerName} onChange={(e) => setSpeakerName(e.target.value)} className="bg-background/50" />
            <Input placeholder="Speaker title" value={speakerTitle} onChange={(e) => setSpeakerTitle(e.target.value)} className="bg-background/50" />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate} disabled={saving}>Create Event</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={events} />
    </div>
  );
};

export default AdminEvents;
