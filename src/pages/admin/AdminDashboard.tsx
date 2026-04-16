import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import MetricsCard from "@/components/admin/MetricsCard";
import { FileText, MessageSquare, Users, Calendar } from "lucide-react";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({ articles: 0, posts: 0, waitlist: 0, registrations: 0 });

  useEffect(() => {
    const load = async () => {
      const [a, p, w, r] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("waitlist").select("id", { count: "exact", head: true }),
        supabase.from("event_registrations").select("id", { count: "exact", head: true }),
      ]);
      setMetrics({
        articles: a.count || 0,
        posts: p.count || 0,
        waitlist: w.count || 0,
        registrations: r.count || 0,
      });
    };
    load();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your platform</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard title="Total Articles" value={metrics.articles} icon={FileText} />
        <MetricsCard title="Total Posts" value={metrics.posts} icon={MessageSquare} />
        <MetricsCard title="Waitlist" value={metrics.waitlist} icon={Users} />
        <MetricsCard title="Event Registrations" value={metrics.registrations} icon={Calendar} />
      </div>
    </div>
  );
};

export default AdminDashboard;
