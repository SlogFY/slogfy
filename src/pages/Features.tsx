import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Cloud, Activity, Home, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Secure cloud-based architecture",
  "Real-time device control & monitoring",
  "Matter-ready smart home ecosystem",
  "Mobile & web dashboard support",
  "Scalable for homes, offices, and institutions",
  "Built with reliability, privacy, and performance in mind",
];

const highlights = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "Secure, scalable cloud infrastructure for all your devices",
  },
  {
    icon: Activity,
    title: "Real-time Control",
    description: "Instant device monitoring and control from anywhere",
  },
  {
    icon: Home,
    title: "Matter-Ready",
    description: "Future-proof ecosystem with Matter protocol support",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Built with security, reliability, and privacy in mind",
  },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Why Choose{" "}
                <span className="text-gradient">SlogFY</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We deliver cutting-edge smart home solutions with a focus on security, scalability, and seamless user experience.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <div>
                {/* Feature List */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/services">
                  <Button variant="glow" size="lg">
                    Explore Our Solutions
                  </Button>
                </Link>
              </div>
              
              {/* Right Content - Highlight Cards */}
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl card-gradient border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
