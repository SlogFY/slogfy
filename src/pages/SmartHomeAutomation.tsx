import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Lightbulb, 
  Power, 
  LayoutGrid, 
  Mic, 
  Expand, 
  Shield, 
  Check, 
  Home, 
  Building2, 
  Users, 
  TrendingUp 
} from "lucide-react";

const offers = [
  {
    icon: Lightbulb,
    title: "Lighting Automation",
    description: "Automated control of lighting for convenience, energy efficiency, and ambience.",
    bullets: [
      "On/off and dimming control",
      "Room-wise and scene-based lighting",
      "Scheduling with manual override",
      "Compatible with existing appliances"
    ],
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Power,
    title: "Appliance Automation",
    description: "Smart control of everyday home appliances without changing your routine.",
    bullets: [
      "Fans, geysers, plugs, and other appliances",
      "Remote and local control",
      "Time-based and condition-based operation",
      "Designed for Indian voltage and load conditions"
    ],
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: LayoutGrid,
    title: "Centralized Control",
    description: "Simple and reliable control designed for all age groups.",
    bullets: [
      "Manage all devices from a single interface",
      "Manual switches remain fully functional",
      "Stable operation even during limited connectivity",
      "Clean and easy-to-use interface"
    ],
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Mic,
    title: "Voice Assistant Support",
    description: "Hands-free control for a more natural smart home experience.",
    bullets: [
      "Voice control for lights and appliances",
      "Scene activation through voice commands",
      "Support for popular voice assistants",
      "Designed to work naturally with Indian accents and usage patterns"
    ],
    color: "from-purple-400 to-pink-500",
    badge: "Future Update",
  },
  {
    icon: Expand,
    title: "Scalable & Future-Ready Design",
    description: "Built to grow with your home.",
    bullets: [
      "Easy addition of rooms and devices",
      "No major rewiring required",
      "Designed for long-term upgrades",
      "Protects your investment over time"
    ],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Shield,
    title: "Safety & Home Security",
    description: "Built-in safety features with a roadmap for advanced security upgrades.",
    bullets: [
      "Door and window monitoring",
      "Motion detection",
      "Emergency alert and SOS integration",
      "Instant notifications for critical events",
      "Advanced intrusion detection",
      "Integration with smart locks and access control"
    ],
    color: "from-red-400 to-orange-500",
    badge: "Future Updates",
  },
];

const whySlogfy = [
  "Premium automation without unnecessary complexity",
  "Designed specifically for Indian homes",
  "Reliable, low-maintenance systems",
  "Energy-efficient and budget-friendly solutions",
  "Professional installation and support",
];

const idealFor = [
  { icon: Building2, text: "Apartments and independent houses" },
  { icon: Home, text: "New construction and existing homes" },
  { icon: Users, text: "Families focused on comfort and safety" },
  { icon: TrendingUp, text: "Homeowners planning long-term upgrades" },
];

const SmartHomeAutomation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.08)_0%,_transparent_50%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up-delay-1">
                Smart Home{" "}
                <span className="text-gradient">Automation</span>
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-up-delay-2">
                Designed for Indian Homes
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="card-gradient rounded-2xl p-8 lg:p-12 border border-border/50">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  <span className="text-gradient">Overview</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  SlogFY provides complete smart home automation solutions that make everyday living more comfortable, secure, and efficient. Our systems are thoughtfully designed for Indian homes, keeping local usage patterns, electrical infrastructure, and budget expectations in mind. From a single room to an entire home, we deliver reliable automation that works smoothly and scales easily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What We{" "}
                <span className="text-gradient">Offer</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="group relative p-6 lg:p-8 rounded-2xl card-gradient border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  {offer.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary">
                      {offer.badge}
                    </span>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <offer.icon className="w-6 h-6 text-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {offer.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {offer.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why SlogFY Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Why{" "}
                  <span className="text-gradient">SlogFY</span>
                </h2>
              </div>
              
              <div className="card-gradient rounded-2xl p-8 lg:p-10 border border-border/50">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {whySlogfy.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ideal{" "}
                <span className="text-gradient">For</span>
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {idealFor.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-2xl card-gradient border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Our{" "}
                  <span className="text-gradient">Approach</span>
                </h2>
              </div>
              
              <div className="card-gradient rounded-2xl p-8 lg:p-12 border border-border/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
                  We understand every home is different. That's why SlogFY focuses on practical automation that works today while being ready for tomorrow. Each system is customized to match your home layout, lifestyle, and budget—without locking you into unnecessary features.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomeAutomation;
