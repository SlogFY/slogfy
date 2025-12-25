import { Check, Smartphone, Zap, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Centralized control from any device",
  "Energy monitoring & optimization",
  "Automated routines & scenes",
  "Real-time alerts & notifications",
  "Voice command integration",
  "Remote access from anywhere",
];

const highlights = [
  {
    icon: Smartphone,
    title: "One App Control",
    description: "Manage every device from a single, intuitive application",
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Reduce energy costs by up to 30% with smart automation",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Continuous monitoring and instant alerts for peace of mind",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade encryption protecting your data",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Experience the Future of{" "}
              <span className="text-gradient">Smart Living</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              slogFy brings cutting-edge technology to your doorstep with solutions designed for modern life. We don't just automate your home – we transform how you live.
            </p>
            
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
            
            <Button variant="glow" size="lg">
              Explore Our Solutions
            </Button>
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
  );
};

export default Features;
