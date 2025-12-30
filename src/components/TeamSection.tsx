import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import teamNarendra from "@/assets/team-narendra.png";
import teamShivendra from "@/assets/team-shivendra.png";
import teamAbhinav from "@/assets/team-abhinav.png";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  display_order: number;
}

// Static image mapping for initial team members
const staticImages: Record<string, string> = {
  "Mr. Narendra Verma": teamNarendra,
  "Mr. Shivendra Pratap Singh": teamShivendra,
  "Mr. Abhinav Prajapati": teamAbhinav,
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        setTeamMembers(data);
      }
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  const getImageUrl = (member: TeamMember) => {
    if (member.image_url) return member.image_url;
    return staticImages[member.name] || null;
  };

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse h-8 bg-muted rounded w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.05)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Meet The{" "}
            <span className="text-gradient">Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            The passionate minds behind SlogFY's innovation
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => {
            const imageUrl = getImageUrl(member);
            return (
              <div
                key={member.id}
                className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl aspect-square">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-4xl text-muted-foreground">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
