import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Courses", href: "/courses" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const courses = [
    "Full Stack Development",
    "Data Science",
    "Digital Marketing",
    "Banking & Finance",
    "Graphics & Animation",
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/newus.dharamshala.2025/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/newusdharamshala/?hl=en", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/newus-65600b233/?originalSubdomain=in", label: "LinkedIn" },
    // { icon: Twitter, href: "#", label: "Twitter" },
    // { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/newus-logo.png" 
                alt="Newus Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-xl font-bold">NEW US Dharamshala</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Transforming lives through education and technology since 1998. 
              Join 74,000+ successful alumni who started their journey with us.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">59, Civil Lines, above Food Plaza Restaurant, near KCC Bank Head Office, Chilgari, Dharamshala</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">86796 86796</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">newusdharamshala@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Newus Dharamshala. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
