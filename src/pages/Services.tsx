import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, Cpu, ShieldAlert, LayoutDashboard, Bot } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Smart Home Automation",
    description: "End-to-end home automation solutions including lighting, appliances, security, and energy control using modern IoT standards.",
    color: "from-primary to-blue-600",
  },
  {
    icon: Cpu,
    title: "Custom IoT Device Development",
    description: "Design and development of custom IoT hardware and firmware based on ESP32, Matter, BLE, Wi-Fi, and cloud integration.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: ShieldAlert,
    title: "Security & SOS Systems",
    description: "Smart security devices with instant SOS alerts, real-time notifications, and remote monitoring.",
    color: "from-secondary to-red-500",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Mobile App Development",
    description: "User and admin dashboards with real-time device control, analytics, and secure cloud connectivity.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Bot,
    title: "Robotics & AI Solutions",
    description: "Custom robotics and AI-based automation projects tailored to specific client requirements.",
    color: "from-cyan-500 to-primary",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.05)_0%,_transparent_50%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Services
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                What We{" "}
                <span className="text-gradient">Offer</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                From smart home automation to custom IoT development, we provide comprehensive solutions tailored to your unique needs.
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative p-6 lg:p-8 rounded-2xl card-gradient border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-7 h-7 text-foreground" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
