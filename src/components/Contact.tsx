import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(199_89%_48%/0.1)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <div className="relative p-8 lg:p-12 rounded-3xl card-gradient border border-border/50 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Get In Touch
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Ready to <span className="text-gradient">Transform</span> Your Home?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Schedule a free consultation with our experts and discover how slogFy can revolutionize your living space.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: Mail, label: "Email Us", value: "hello@slogfy.com" },
                  { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Visit Us", value: "San Francisco, CA" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="heroOutline" size="xl">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
