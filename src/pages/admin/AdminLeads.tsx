import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DataTable from "@/components/admin/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminLeads = () => {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("waitlist").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter").select("*").order("created_at", { ascending: false }),
    ]).then(([w, i, n]) => {
      setWaitlist(w.data || []);
      setInquiries(i.data || []);
      setNewsletter(n.data || []);
    });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-heading font-bold">Leads</h1>
      <Tabs defaultValue="waitlist">
        <TabsList>
          <TabsTrigger value="waitlist">Waitlist ({waitlist.length})</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries ({inquiries.length})</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter ({newsletter.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="waitlist" className="mt-4">
          <DataTable
            columns={[
              { header: "Name", accessor: (r: any) => r.name },
              { header: "Email", accessor: (r: any) => r.email },
              { header: "Interest", accessor: (r: any) => r.interest || "—" },
              { header: "Date", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
            ]}
            data={waitlist}
          />
        </TabsContent>
        <TabsContent value="inquiries" className="mt-4">
          <DataTable
            columns={[
              { header: "Name", accessor: (r: any) => r.name },
              { header: "Email", accessor: (r: any) => r.email },
              { header: "Message", accessor: (r: any) => <span className="text-sm truncate max-w-[300px] block">{r.message}</span> },
              { header: "Date", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
            ]}
            data={inquiries}
          />
        </TabsContent>
        <TabsContent value="newsletter" className="mt-4">
          <DataTable
            columns={[
              { header: "Email", accessor: (r: any) => r.email },
              { header: "Date", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
            ]}
            data={newsletter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLeads;
