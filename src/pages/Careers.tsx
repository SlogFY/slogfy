import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, GraduationCap, Linkedin, FileText, User, Mail, Phone, Building, BookOpen, Calendar } from "lucide-react";

const internshipSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  college: z.string().min(2, "College name is required").max(200),
  branch: z.string().min(2, "Branch is required").max(100),
  year: z.string().min(1, "Year is required"),
  about: z.string().min(50, "Please write at least 50 characters about yourself").max(1000),
  linkedin_url: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  resume_url: z.string().url("Invalid resume URL").optional().or(z.literal("")),
});

type InternshipFormData = z.infer<typeof internshipSchema>;

const Careers = () => {
  const [activeTab, setActiveTab] = useState<"internship" | "job">("internship");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
  });

  const onSubmit = async (data: InternshipFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("career_applications").insert({
        application_type: activeTab,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        college: data.college,
        branch: data.branch,
        year: data.year,
        about: data.about,
        linkedin_url: data.linkedin_url || null,
        resume_url: data.resume_url || null,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted! 🎉",
        description: "Thank you for applying. We'll get back to you soon.",
      });
      reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Be part of the future of smart home automation and IoT technology. 
              We're looking for passionate individuals to join our team.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === "internship" ? "default" : "outline"}
              onClick={() => setActiveTab("internship")}
              className="flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Internship
            </Button>
            <Button
              variant={activeTab === "job" ? "default" : "outline"}
              onClick={() => setActiveTab("job")}
              disabled
              className="flex items-center gap-2 opacity-50 cursor-not-allowed"
            >
              <Briefcase className="w-4 h-4" />
              Job (Coming Soon)
            </Button>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Internship Application
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name *
                    </Label>
                    <Input
                      placeholder="Your full name"
                      {...register("full_name")}
                      className={errors.full_name ? "border-destructive" : ""}
                    />
                    {errors.full_name && (
                      <p className="text-sm text-destructive">{errors.full_name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email *
                    </Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    {...register("phone")}
                  />
                </div>

                {/* Educational Info */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      College *
                    </Label>
                    <Input
                      placeholder="College name"
                      {...register("college")}
                      className={errors.college ? "border-destructive" : ""}
                    />
                    {errors.college && (
                      <p className="text-sm text-destructive">{errors.college.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      Branch *
                    </Label>
                    <Input
                      placeholder="e.g., CSE, ECE"
                      {...register("branch")}
                      className={errors.branch ? "border-destructive" : ""}
                    />
                    {errors.branch && (
                      <p className="text-sm text-destructive">{errors.branch.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Year *
                    </Label>
                    <Input
                      placeholder="e.g., 3rd Year"
                      {...register("year")}
                      className={errors.year ? "border-destructive" : ""}
                    />
                    {errors.year && (
                      <p className="text-sm text-destructive">{errors.year.message}</p>
                    )}
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Tell us about yourself *
                  </Label>
                  <Textarea
                    placeholder="Describe your skills, experience, interests, and why you want to join SlogFY..."
                    rows={5}
                    {...register("about")}
                    className={errors.about ? "border-destructive" : ""}
                  />
                  {errors.about && (
                    <p className="text-sm text-destructive">{errors.about.message}</p>
                  )}
                </div>

                {/* Links */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...register("linkedin_url")}
                      className={errors.linkedin_url ? "border-destructive" : ""}
                    />
                    {errors.linkedin_url && (
                      <p className="text-sm text-destructive">{errors.linkedin_url.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      Resume URL (Optional)
                    </Label>
                    <Input
                      placeholder="Google Drive or other link"
                      {...register("resume_url")}
                      className={errors.resume_url ? "border-destructive" : ""}
                    />
                    {errors.resume_url && (
                      <p className="text-sm text-destructive">{errors.resume_url.message}</p>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
