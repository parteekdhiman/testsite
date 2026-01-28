import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitLead, subscribeNewsletter } from "@/utils/apiService";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [subscriberEmail, setSubscriberEmail] = useState("");

  const handleSubscribe = async () => {
    if (!subscriberEmail) {
      toast({ title: "Enter email", description: "Please enter an email to subscribe." });
      return;
    }

    // SECURITY: Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriberEmail.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await subscribeNewsletter({ email: subscriberEmail });
      toast({ title: "Subscribed", description: "You'll receive updates to your email." });
      setSubscriberEmail("");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Subscription Failed",
        description: errorMsg.includes('429') ? "Too many requests. Please try again later." : "There was an error subscribing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // SECURITY: Validate form data before submission
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const phoneRegex = /^[\d\s\-+()]{7,20}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      await submitLead({
        firstName,
        lastName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message || `Interested in ${formData.course || 'courses'}`
      });
      
      toast({
        title: "Enquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Submission Failed",
        description: errorMsg.includes('429') ? "Too many submissions. Please try again later." : "There was an error submitting your enquiry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", content: "59, Civil Lines, above Food Plaza Restaurant, near KCC Bank Head Office, Chilgari, Dharamshala" },
    { icon: Phone, title: "Phone", content: "86796 86796" },
    { icon: Mail, title: "Email", content: "newusdharamshala@gmail.com" },
    { icon: Clock, title: "Working Hours", content: "Mon - Sat: 9:00 AM - 6:00 PM" },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Start Your{" "}
            <span className="gradient-text">Journey Today</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our courses? Fill out the form below and our counselors will get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-display font-semibold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-secondary/50 border-border/50"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-secondary/50 border-border/50"
                />
                <Input
                  placeholder="Course of Interest"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <Textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-secondary/50 border-border/50"
              />
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-pink-500 hover:opacity-90">
                <Send className="mr-2 w-4 h-4" />
                Submit Enquiry
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="glass rounded-xl p-5 flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="glass rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.8371854843386!2d76.3234!3d32.2196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b5692e4e0f0c7%3A0x3e4c8e2e1e8e3e3e!2sDharamshala%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Newus Dharamshala Location"
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Subscribe */}
            <div className="mt-6 glass rounded-2xl p-6">
              <h4 className="font-display font-semibold text-lg mb-3">Stay Updated</h4>
              <p className="text-muted-foreground mb-3">Get updates about courses, webinars and more.</p>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter your email"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
                <Button onClick={handleSubscribe} className="bg-gradient-to-r from-primary to-pink-500">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
