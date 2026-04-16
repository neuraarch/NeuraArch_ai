import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");

  const load = async () => {
    let q = supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    if (search) q = q.ilike("title", `%${search}%`);
    const { data } = await q;
    setArticles(data || []);
  };

  useEffect(() => { load(); }, [filter, search]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this article?")) return;
    await supabase.from("articles").delete().eq("id", id);
    toast.success("Article deleted");
    load();
  };

  const columns = [
    { header: "Title", accessor: (r: any) => <span className="font-medium text-foreground">{r.title}</span> },
    { header: "Status", accessor: (r: any) => <StatusBadge status={r.status} /> },
    { header: "Created", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
    {
      header: "Actions",
      accessor: (r: any) => (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleDelete(r.id, e)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
      className: "w-20",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Articles</h1>
        <Button onClick={() => navigate("/admin/articles/new")} className="gap-2">
          <Plus className="h-4 w-4" /> New Article
        </Button>
      </div>
      <div className="flex gap-3">
        <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs bg-card" />
        <div className="flex gap-1">
          {(["all", "draft", "published"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f}
            </Button>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={articles} onRowClick={(r) => navigate(`/admin/articles/${r.id}`)} />
    </div>
  );
};

export default AdminArticles;
