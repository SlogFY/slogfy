import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Lightbulb, 
  Power, 
  LayoutGrid, 
  Mic, 
  MicOff,
  Expand, 
  Shield, 
  Check, 
  Home, 
  Building2, 
  Users, 
  TrendingUp 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSlogiAssistant } from "@/hooks/useSlogiAssistant";
import AutomationOverviewPanel from "@/components/smart-home/AutomationOverviewPanel";

const offers = [
  {
    id: "lighting",
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
    id: "appliance",
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
    id: "centralized",
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
    id: "voice",
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
    id: "scalable",
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
    id: "security",
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
  const [isDayMode, setIsDayMode] = useState(false);
  const [isSpotlightMode, setIsSpotlightMode] = useState(false);
  const [isGridMode, setIsGridMode] = useState(false);
  const [isExpandMode, setIsExpandMode] = useState(false);
  const [isShieldMode, setIsShieldMode] = useState(false);
  const [voiceBars, setVoiceBars] = useState<number[]>([]);
  
  const { 
    isActive: isVoiceMode, 
    isListening, 
    isSpeaking, 
    transcript, 
    response, 
    startAssistant, 
    stopAssistant 
  } = useSlogiAssistant();

  // Voice wave animation
  useEffect(() => {
    if (isVoiceMode || isListening || isSpeaking) {
      const interval = setInterval(() => {
        setVoiceBars(Array.from({ length: 12 }, () => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVoiceMode, isListening, isSpeaking]);

  // Auto-close shield scan after 3 seconds
  useEffect(() => {
    if (isShieldMode) {
      const timer = setTimeout(() => setIsShieldMode(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isShieldMode]);

  const handleIconClick = (offerId: string) => {
    if (offerId === "lighting") {
      setIsDayMode(!isDayMode);
    } else if (offerId === "appliance") {
      setIsSpotlightMode(!isSpotlightMode);
    } else if (offerId === "centralized") {
      setIsGridMode(!isGridMode);
    } else if (offerId === "voice") {
      if (isVoiceMode) {
        stopAssistant();
      } else {
        startAssistant();
      }
    } else if (offerId === "scalable") {
      setIsExpandMode(!isExpandMode);
    } else if (offerId === "security") {
      setIsShieldMode(true);
    }
  };

  // Spotlight mode - only show the Appliance icon
  if (isSpotlightMode) {
    const applianceOffer = offers.find(o => o.id === "appliance")!;
    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center cursor-pointer"
        onClick={() => setIsSpotlightMode(false)}
      >
        <div 
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${applianceOffer.color} flex items-center justify-center shadow-2xl animate-pulse`}
        >
          <Power className="w-12 h-12 text-foreground" />
        </div>
      </div>
    );
  }

  // Voice Assistant mode - full screen voice wave with Slogi
  if (isVoiceMode) {
    return (
      <div 
        className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 px-4"
      >
        {/* Slogi Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
          {isListening ? (
            <Mic className="w-10 h-10 text-white animate-pulse" />
          ) : (
            <MicOff className="w-10 h-10 text-white/70" />
          )}
        </div>

        {/* Voice Wave */}
        <div className="flex items-end gap-1 h-24">
          {voiceBars.map((height, i) => (
            <div
              key={i}
              className={`w-3 rounded-full transition-all duration-100 ${
                isSpeaking 
                  ? 'bg-gradient-to-t from-pink-500 to-purple-400' 
                  : isListening 
                    ? 'bg-gradient-to-t from-purple-500 to-pink-500'
                    : 'bg-gradient-to-t from-gray-600 to-gray-500'
              }`}
              style={{ height: `${Math.max(20, height)}%` }}
            />
          ))}
        </div>

        {/* Status */}
        <div className="text-center space-y-2">
          <p className={`text-lg font-medium ${isSpeaking ? 'text-pink-400' : isListening ? 'text-purple-400' : 'text-muted-foreground'}`}>
            {isSpeaking ? "Slogi is speaking..." : isListening ? "Listening..." : "Processing..."}
          </p>
          
          {transcript && (
            <p className="text-sm text-muted-foreground max-w-md">
              You: "{transcript}"
            </p>
          )}
          
          {response && !isSpeaking && (
            <p className="text-sm text-purple-300 max-w-md">
              Slogi: "{response}"
            </p>
          )}
        </div>

        {/* Exit Button */}
        <button 
          onClick={stopAssistant}
          className="mt-8 px-6 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors text-sm"
        >
          Tap to exit
        </button>
      </div>
    );
  }

  // Expand mode - fullscreen zoom effect
  if (isExpandMode) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-black flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => setIsExpandMode(false)}
      >
        <div className="relative">
          {/* Expanding rings */}
          {[1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-ping"
              style={{ 
                animationDelay: `${ring * 0.3}s`,
                width: `${ring * 80}px`,
                height: `${ring * 80}px`,
                left: `${-ring * 40 + 40}px`,
                top: `${-ring * 40 + 40}px`,
              }}
            />
          ))}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl relative z-10">
            <Expand className="w-10 h-10 text-foreground" />
          </div>
        </div>
        <p className="absolute bottom-20 text-cyan-400/60 text-sm">Scalable by design</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDayMode ? 'bg-white' : 'bg-background'}`}>
      {/* Shield Scan Overlay */}
      {isShieldMode && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
          <div className="relative">
            <Shield className="w-24 h-24 text-red-500 animate-pulse" />
            <div className="absolute inset-0 border-4 border-red-500/50 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 animate-[scan_3s_ease-in-out]" style={{ animation: 'scan 3s ease-in-out' }} />
            </div>
            <p className="text-red-400 text-sm animate-pulse">Scanning home security...</p>
          </div>
          <style>{`
            @keyframes scan {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      {/* Grid Shuffle Overlay */}
      {isGridMode && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-pointer p-8"
          onClick={() => setIsGridMode(false)}
        >
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {offers.map((offer, i) => (
              <div
                key={offer.id}
                className={`w-20 h-20 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center shadow-xl animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1s' }}
              >
                <offer.icon className="w-8 h-8 text-foreground" />
              </div>
            ))}
          </div>
          <p className="absolute bottom-16 text-muted-foreground text-sm">All devices, one control</p>
        </div>
      )}

      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className={`absolute inset-0 ${isDayMode ? 'bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.1)_0%,_transparent_50%)]' : 'bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%/0.08)_0%,_transparent_50%)]'}`} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-up ${isDayMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                  Our Services
                </span>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up-delay-1 ${isDayMode ? 'text-gray-900' : ''}`}>
                  Smart Home{" "}
                  <span className="text-gradient">Automation</span>
                </h1>
                <p className={`text-xl animate-fade-up-delay-2 ${isDayMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
                  Designed for Indian Homes
                </p>
              </div>

              {/* Desktop: use the right-side hero area */}
              <div className="relative hidden lg:block">
                <AutomationOverviewPanel />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile: bottom-sheet */}
        <div className="lg:hidden">
          <AutomationOverviewPanel />
        </div>

        {/* Overview Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className={`rounded-2xl p-8 lg:p-12 border transition-colors duration-500 ${isDayMode ? 'bg-gray-50 border-gray-200' : 'card-gradient border-border/50'}`}>
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  <span className="text-gradient">Overview</span>
                </h2>
                <p className={`text-lg leading-relaxed text-center ${isDayMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
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
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDayMode ? 'text-gray-900' : ''}`}>
                What We{" "}
                <span className="text-gradient">Offer</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className={`group relative p-6 lg:p-8 rounded-2xl border transition-all duration-500 ${isDayMode ? 'bg-white border-gray-200 hover:border-primary/50 shadow-sm hover:shadow-md' : 'card-gradient border-border/50 hover:border-primary/30'}`}
                >
                  {offer.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary">
                      {offer.badge}
                    </span>
                  )}
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        onClick={() => handleIconClick(offer.id)}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer hover:scale-125`}
                      >
                        <offer.icon className="w-6 h-6 text-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tap me! ✨</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <h3 className={`text-xl font-semibold mb-3 ${isDayMode ? 'text-gray-900' : 'text-foreground'}`}>
                    {offer.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDayMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
                    {offer.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {offer.bullets.map((bullet, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-sm ${isDayMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
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
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDayMode ? 'text-gray-900' : ''}`}>
                  Why{" "}
                  <span className="text-gradient">SlogFY</span>
                </h2>
              </div>
              
              <div className={`rounded-2xl p-8 lg:p-10 border transition-colors duration-500 ${isDayMode ? 'bg-gray-50 border-gray-200' : 'card-gradient border-border/50'}`}>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {whySlogfy.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className={isDayMode ? 'text-gray-900' : 'text-foreground'}>{item}</span>
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
              <h2 className={`text-3xl sm:text-4xl font-bold ${isDayMode ? 'text-gray-900' : ''}`}>
                Ideal{" "}
                <span className="text-gradient">For</span>
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {idealFor.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 ${isDayMode ? 'bg-white border-gray-200 hover:border-primary/50 shadow-sm' : 'card-gradient border-border/50 hover:border-primary/30'}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`text-sm ${isDayMode ? 'text-gray-600' : 'text-muted-foreground'}`}>{item.text}</span>
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
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDayMode ? 'text-gray-900' : ''}`}>
                  Our{" "}
                  <span className="text-gradient">Approach</span>
                </h2>
              </div>
              
              <div className={`rounded-2xl p-8 lg:p-12 border relative overflow-hidden transition-colors duration-500 ${isDayMode ? 'bg-gray-50 border-gray-200' : 'card-gradient border-border/50'}`}>
                <div className={`absolute inset-0 ${isDayMode ? 'bg-gradient-to-br from-primary/10 to-secondary/10' : 'bg-gradient-to-br from-primary/5 to-secondary/5'}`} />
                <p className={`text-lg leading-relaxed text-center relative z-10 ${isDayMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
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
