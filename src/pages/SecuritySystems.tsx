import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ShieldAlert, 
  Bell, 
  Eye, 
  DoorOpen, 
  Smartphone, 
  AlertTriangle,
  Check, 
  Home, 
  Building2, 
  Users, 
  Store 
} from "lucide-react";

const offers = [
  {
    icon: Bell,
    title: "SOS & Emergency Alerts",
    description: "Instant alerts when you need help the most.",
    bullets: [
      "One-touch SOS activation",
      "Multiple emergency contact notifications",
      "GPS location sharing",
      "Works even with limited connectivity"
    ],
    color: "from-red-400 to-orange-500",
  },
  {
    icon: DoorOpen,
    title: "Door & Window Monitoring",
    description: "Know when entry points are accessed.",
    bullets: [
      "Real-time open/close status",
      "Instant notifications on unauthorized access",
      "Activity history and logs",
      "Low battery alerts for sensors"
    ],
    color: "from-orange-400 to-yellow-500",
  },
  {
    icon: Eye,
    title: "Motion Detection",
    description: "Detect movement in protected areas.",
    bullets: [
      "PIR-based motion sensing",
      "Customizable sensitivity",
      "Zone-based monitoring",
      "Pet-friendly options available"
    ],
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App Control",
    description: "Complete control from your smartphone.",
    bullets: [
      "Real-time status monitoring",
      "Arm/disarm remotely",
      "Push notifications for alerts",
      "Family member access control"
    ],
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: AlertTriangle,
    title: "Intrusion Detection",
    description: "Advanced detection for comprehensive security.",
    bullets: [
      "Glass break detection",
      "Vibration sensors for doors/windows",
      "Perimeter breach alerts",
      "Integration with local authorities"
    ],
    color: "from-purple-400 to-pink-500",
    badge: "Future Update",
  },
  {
    icon: ShieldAlert,
    title: "Smart Lock Integration",
    description: "Secure access control for your home.",
    bullets: [
      "Keyless entry options",
      "Temporary access codes for guests",
      "Auto-lock scheduling",
      "Entry logs and history"
    ],
    color: "from-cyan-400 to-blue-500",
    badge: "Future Update",
  },
];

const whySlogfy = [
  "Built-in safety as a core feature",
  "Designed for Indian home security needs",
  "Reliable even in power/network outages",
  "Easy installation and maintenance",
  "Affordable and scalable solutions",
];

const idealFor = [
  { icon: Home, text: "Families with children and elderly" },
  { icon: Building2, text: "Apartments and gated communities" },
  { icon: Store, text: "Small businesses and shops" },
  { icon: Users, text: "Anyone prioritizing safety" },
];

const SecuritySystems = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(30_100%_50%/0.08)_0%,_transparent_50%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6 animate-fade-up">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up-delay-1">
                Security &{" "}
                <span className="text-gradient">SOS Systems</span>
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-up-delay-2">
                Safety First, Always
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
                  SlogFY's security solutions are designed with one goal: keeping you and your family safe. Our smart security devices provide instant SOS alerts, real-time notifications, and remote monitoring capabilities. Built specifically for Indian homes, our systems work reliably even during power outages and network disruptions, ensuring you're always protected.
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
                  className="group relative p-6 lg:p-8 rounded-2xl card-gradient border border-border/50 hover:border-secondary/30 transition-all duration-500"
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
                        <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
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
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-secondary" />
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
                  className="flex flex-col items-center text-center p-6 rounded-2xl card-gradient border border-border/50 hover:border-secondary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-secondary" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-red-500/5" />
                <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
                  Security isn't just about technology—it's about peace of mind. We design our systems to be reliable, easy to use, and effective. Every feature is tested for real-world Indian conditions, from power fluctuations to network instability. Our goal is simple: when you need help, our systems work—every single time.
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

export default SecuritySystems;
