import { Target, Eye, Cpu } from "lucide-react";
import logo from "@/assets/slogfy-logo.png";

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(199_89%_48%/0.08)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Logo & Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl scale-150" />
              
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-12 border border-border/50">
                <img 
                  src={logo} 
                  alt="SlogFY Logo" 
                  className="w-64 h-64 object-contain mx-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Right - Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Who We{" "}
              <span className="text-gradient">Are</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              SlogFY is a technology-driven company focused on smart home automation, IoT devices, and intelligent safety solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our mission is to make homes smarter, safer, and more responsive through practical innovation. We design everything with a clear focus on reliability, user experience, and future-ready technology.
            </p>
            
            {/* Values */}
            <div className="grid gap-4">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  description: "Making homes smarter, safer, and more responsive through practical innovation.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  description: "To be the leading provider of intelligent home automation solutions in India.",
                },
                {
                  icon: Cpu,
                  title: "Our Focus",
                  description: "Reliability, user experience, and future-ready technology in every product.",
                },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
