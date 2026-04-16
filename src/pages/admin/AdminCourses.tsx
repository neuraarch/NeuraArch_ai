import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AdminCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("coming_soon");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
    setCourses(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!title) { toast.error("Title required"); return; }
    setSaving(true);
    const { error } = await supabase.from("courses").insert({
      title, slug: slugify(title), description: description || null,
      status, price: price ? Number(price) : null,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Course created!");
    setTitle(""); setDescription(""); setStatus("coming_soon"); setPrice("");
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this course?")) return;
    await supabase.from("courses").delete().eq("id", id);
    toast.success("Course deleted");
    load();
  };

  const columns = [
    { header: "Title", accessor: (r: any) => <span className="font-medium text-foreground">{r.title}</span> },
    { header: "Status", accessor: (r: any) => <StatusBadge status={r.status} /> },
    { header: "Price", accessor: (r: any) => r.price ? `$${r.price}` : "Free" },
    { header: "Created", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
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
        <h1 className="text-2xl font-heading font-bold">Courses</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> New Course</Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <Input placeholder="Course title..." value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background/50 text-lg font-heading" />
          <Textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="bg-background/50" />
          <div className="grid grid-cols-2 gap-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="coming_soon">Coming Soon</SelectItem>
                <SelectItem value="live">Live</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Price (leave empty for free)" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-background/50" type="number" />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate} disabled={saving}>Create Course</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default AdminCourses;
