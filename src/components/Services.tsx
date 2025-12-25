import { Lightbulb, Shield, Thermometer, Tv, Wifi, Mic } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Smart Lighting",
    description: "Automated lighting that adjusts to your mood, time of day, and activities. Save energy while creating the perfect ambiance.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Security Systems",
    description: "Advanced security with smart locks, cameras, and sensors. Monitor your home from anywhere, anytime.",
    color: "from-primary to-blue-600",
  },
  {
    icon: Thermometer,
    title: "Climate Control",
    description: "Intelligent HVAC management that learns your preferences and optimizes energy consumption automatically.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Tv,
    title: "Entertainment",
    description: "Seamless integration of audio, video, and streaming services throughout your home with voice control.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Wifi,
    title: "Network Solutions",
    description: "Robust, whole-home networking ensuring fast, reliable connectivity for all your smart devices.",
    color: "from-cyan-500 to-primary",
  },
  {
    icon: Mic,
    title: "Voice Integration",
    description: "Compatible with Alexa, Google Home, and Siri. Control everything with simple voice commands.",
    color: "from-secondary to-red-500",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Complete Home{" "}
            <span className="text-gradient">Automation Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From lighting to security, we provide comprehensive smart home solutions tailored to your unique needs.
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
  );
};

export default Services;
