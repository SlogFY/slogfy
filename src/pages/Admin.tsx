import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, LogOut, Users, Edit2, Save, X, GraduationCap } from "lucide-react";
import CareerApplications from "@/components/admin/CareerApplications";
import { User } from "@supabase/supabase-js";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  display_order: number;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", image_url: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", role: "", image_url: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        } else {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (data) {
      setIsAdmin(true);
      fetchTeamMembers();
    } else {
      setIsAdmin(false);
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges. Contact the administrator.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setTeamMembers(data);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.name.trim() || !newMember.role.trim()) {
      toast({
        title: "Error",
        description: "Please fill in name and role",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("team_members").insert({
      name: newMember.name.trim(),
      role: newMember.role.trim(),
      image_url: newMember.image_url.trim() || null,
      display_order: teamMembers.length + 1,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
      setNewMember({ name: "", role: "", image_url: "" });
      fetchTeamMembers();
    }
  };

  const handleDeleteMember = async (id: string) => {
    const { error } = await supabase.from("team_members").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team member removed successfully",
      });
      fetchTeamMembers();
    }
  };

  const startEditing = (member: TeamMember) => {
    setEditingId(member.id);
    setEditForm({
      name: member.name,
      role: member.role,
      image_url: member.image_url || "",
    });
  };

  const handleUpdateMember = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from("team_members")
      .update({
        name: editForm.name.trim(),
        role: editForm.role.trim(),
        image_url: editForm.image_url.trim() || null,
      })
      .eq("id", editingId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
      setEditingId(null);
      fetchTeamMembers();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges to access this page.
            </p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Manage your team members</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Add New Member */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New Team Member
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="John Doe"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  placeholder="CEO, Developer, etc."
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL (optional)</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={newMember.image_url}
                  onChange={(e) =>
                    setNewMember({ ...newMember, image_url: e.target.value })
                  }
                />
              </div>
            </div>
            <Button className="mt-4" onClick={handleAddMember}>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          {/* Team Members List */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Team Members ({teamMembers.length})
            </h2>
            
            {teamMembers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No team members yet. Add your first team member above.
              </p>
            ) : (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border/30"
                  >
                    {editingId === member.id ? (
                      <div className="flex-1 grid sm:grid-cols-3 gap-4">
                        <Input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          placeholder="Name"
                        />
                        <Input
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({ ...editForm, role: e.target.value })
                          }
                          placeholder="Role"
                        />
                        <Input
                          value={editForm.image_url}
                          onChange={(e) =>
                            setEditForm({ ...editForm, image_url: e.target.value })
                          }
                          placeholder="Image URL"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 flex-1">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {member.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {editingId === member.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={handleUpdateMember}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(member)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Applications */}
          <div className="mt-8">
            <CareerApplications />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
