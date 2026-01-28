import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Trash2, ExternalLink, GraduationCap, Briefcase } from "lucide-react";

interface CareerApplication {
  id: string;
  application_type: string;
  full_name: string;
  email: string;
  phone: string | null;
  college: string;
  branch: string;
  year: string;
  about: string;
  linkedin_url: string | null;
  resume_url: string | null;
  status: string;
  created_at: string;
}

const CareerApplications = () => {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("career_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("career_applications")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Application removed successfully",
      });
      fetchApplications();
    }
  };

  const exportToExcel = () => {
    if (applications.length === 0) {
      toast({
        title: "No Data",
        description: "No applications to export",
        variant: "destructive",
      });
      return;
    }

    // Create CSV content
    const headers = [
      "Type",
      "Full Name",
      "Email",
      "Phone",
      "College",
      "Branch",
      "Year",
      "About",
      "LinkedIn",
      "Resume",
      "Status",
      "Applied On",
    ];

    const rows = applications.map((app) => [
      app.application_type,
      app.full_name,
      app.email,
      app.phone || "",
      app.college,
      app.branch,
      app.year,
      `"${app.about.replace(/"/g, '""')}"`,
      app.linkedin_url || "",
      app.resume_url || "",
      app.status,
      new Date(app.created_at).toLocaleDateString("en-IN"),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `career_applications_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Exported!",
      description: "Applications exported to CSV successfully",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Career Applications ({applications.length})
        </h2>
        <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export to Excel/CSV
        </Button>
      </div>

      {applications.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No applications received yet.
        </p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-xl bg-muted/30 border border-border/30"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.application_type === "internship" 
                        ? "bg-blue-500/20 text-blue-400" 
                        : "bg-green-500/20 text-green-400"
                    }`}>
                      {app.application_type === "internship" ? (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" /> Internship
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> Job
                        </span>
                      )}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "pending" 
                        ? "bg-yellow-500/20 text-yellow-400" 
                        : app.status === "accepted"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{app.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{app.email} {app.phone && `• ${app.phone}`}</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">College:</span>{" "}
                      <span className="text-foreground">{app.college}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Branch:</span>{" "}
                      <span className="text-foreground">{app.branch}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year:</span>{" "}
                      <span className="text-foreground">{app.year}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-sm">About:</span>
                    <p className="text-foreground text-sm mt-1 whitespace-pre-wrap">{app.about}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {app.linkedin_url && (
                      <a
                        href={app.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" /> LinkedIn
                      </a>
                    )}
                    {app.resume_url && (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" /> Resume
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Applied on: {new Date(app.created_at).toLocaleString("en-IN")}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(app.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerApplications;
