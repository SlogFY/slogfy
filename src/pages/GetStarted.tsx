import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Share your requirements with our team. We'll understand your space and automation needs.",
  },
  {
    number: "02",
    title: "Custom Design",
    description: "We create a tailored solution blueprint matching your lifestyle and budget.",
  },
  {
    number: "03",
    title: "Installation",
    description: "Our expert team handles complete setup with minimal disruption.",
  },
  {
    number: "04",
    title: "Go Live",
    description: "Start enjoying your smart home with full training and ongoing support.",
  },
];

const benefits = [
  { icon: Zap, text: "Quick Installation" },
  { icon: Shield, text: "Secure & Reliable" },
  { icon: Sparkles, text: "Customized Solutions" },
  { icon: CheckCircle, text: "24/7 Support" },
];

const GetStartedPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.08)_0%,_transparent_50%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Get Started
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Begin Your{" "}
                <span className="text-gradient">Smart Home Journey</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Transform your space into an intelligent, connected home in just a few simple steps.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
                  <benefit.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-2xl card-gradient border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="xl">
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="heroOutline" size="xl">
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetStartedPage;
