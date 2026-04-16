import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/admin/DataTable";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminComments = () => {
  const [comments, setComments] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("comments").select("*").order("created_at", { ascending: false });
    setComments(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    await supabase.from("comments").delete().eq("id", id);
    toast.success("Comment deleted");
    load();
  };

  const columns = [
    { header: "Text", accessor: (r: any) => <span className="text-sm max-w-[400px] block truncate">{r.text}</span> },
    { header: "Type", accessor: (r: any) => r.article_id ? "Article" : r.post_id ? "Post" : "—" },
    { header: "Date", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
    {
      header: "",
      accessor: (r: any) => (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(r.id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
      className: "w-16",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-heading font-bold">Comments</h1>
      <DataTable columns={columns} data={comments} />
    </div>
  );
};

export default AdminComments;
