import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Cpu, 
  Wifi, 
  Cloud, 
  Layers, 
  Settings, 
  Zap,
  Check, 
  Factory, 
  Home, 
  Building, 
  Lightbulb 
} from "lucide-react";

const offers = [
  {
    icon: Cpu,
    title: "ESP32 & Microcontroller Solutions",
    description: "Custom firmware development for powerful and efficient IoT devices.",
    bullets: [
      "ESP32, ESP8266, and ARM-based solutions",
      "Low-power design for battery-operated devices",
      "Real-time operating system (RTOS) implementation",
      "Secure bootloader and OTA updates"
    ],
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Wifi,
    title: "Wireless Connectivity",
    description: "Multiple connectivity options tailored to your requirements.",
    bullets: [
      "Wi-Fi, BLE, and Zigbee support",
      "Matter protocol integration",
      "Mesh networking capabilities",
      "Optimized for Indian network conditions"
    ],
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless connection to cloud platforms for data and control.",
    bullets: [
      "AWS IoT, Google Cloud IoT integration",
      "Custom backend solutions",
      "Real-time data sync and storage",
      "Secure API endpoints"
    ],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Layers,
    title: "Hardware Design",
    description: "End-to-end hardware development from concept to production.",
    bullets: [
      "PCB design and prototyping",
      "Component selection and sourcing",
      "Enclosure design for Indian conditions",
      "EMC compliance and testing"
    ],
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Settings,
    title: "Firmware Development",
    description: "Robust and efficient firmware for reliable operation.",
    bullets: [
      "Embedded C/C++ development",
      "Driver development for sensors and actuators",
      "Power management optimization",
      "Extensive testing and validation"
    ],
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Zap,
    title: "Production Support",
    description: "Complete support from prototype to mass production.",
    bullets: [
      "Manufacturing partner coordination",
      "Quality control processes",
      "Production testing solutions",
      "Post-production support"
    ],
    color: "from-yellow-400 to-orange-500",
  },
];

const whySlogfy = [
  "Deep expertise in embedded systems and IoT",
  "End-to-end development capability",
  "Focus on reliability and longevity",
  "Cost-effective solutions for Indian market",
  "Ongoing support and maintenance",
];

const idealFor = [
  { icon: Factory, text: "Startups building IoT products" },
  { icon: Building, text: "Enterprises needing custom solutions" },
  { icon: Home, text: "Smart home device manufacturers" },
  { icon: Lightbulb, text: "Innovators with unique IoT ideas" },
];

const CustomIoTDevelopment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(280_89%_48%/0.08)_0%,_transparent_50%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6 animate-fade-up">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up-delay-1">
                Custom IoT{" "}
                <span className="text-gradient">Device Development</span>
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-up-delay-2">
                From Concept to Production
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
                  SlogFY specializes in designing and developing custom IoT hardware and firmware solutions. Whether you need a smart sensor, connected appliance, or industrial monitoring device, we provide end-to-end development services using modern technologies like ESP32, Matter protocol, BLE, Wi-Fi, and cloud integration. Our solutions are built for reliability, scalability, and the unique requirements of the Indian market.
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
                  className="group relative p-6 lg:p-8 rounded-2xl card-gradient border border-border/50 hover:border-purple-500/30 transition-all duration-500"
                >
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
                        <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
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
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-purple-400" />
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
                  className="flex flex-col items-center text-center p-6 rounded-2xl card-gradient border border-border/50 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-purple-400" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
                <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
                  We believe in a collaborative approach to IoT development. From initial concept discussions to final production, we work closely with you to ensure the solution meets your exact requirements. Our team combines deep technical expertise with practical experience to deliver devices that are not just innovative but also manufacturable, maintainable, and cost-effective.
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

export default CustomIoTDevelopment;
