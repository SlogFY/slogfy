import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/slogfy-logo.png";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  services: [
    { name: "Smart Home Automation", href: "/services" },
    { name: "IoT Development", href: "/services" },
    { name: "Security Systems", href: "/services" },
    { name: "Robotics & AI", href: "/services" },
  ],
  support: [
    { name: "Help Center", href: "/contact" },
    { name: "Documentation", href: "/contact" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/slogfy/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/slogfy", label: "X (Twitter)" },
  { icon: Facebook, href: "https://www.facebook.com/slogfy/", label: "Facebook" },
  { icon: Linkedin, href: "https://in.linkedin.com/company/slogify", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/@slogFY", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="SlogFY Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              SlogFY is a technology-driven company focused on smart home automation, IoT devices, and intelligent safety solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SlogFY. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
