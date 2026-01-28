import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import img from "../assets/Newus_Job_Fiar_Banner.png"

const OneTimePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    designation: '',
    experience: '',
    expertise: '',
  });

  useEffect(() => {
    // Show on initial mount only once per page load
    // If user has closed it in this session, keep it closed until refresh
    const hasClosedThisLoad = sessionStorage.getItem("oneTimePopupClosed");
    if (!hasClosedThisLoad) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = (): void => {
    setIsOpen(false);
    setShowForm(false);
    sessionStorage.setItem("oneTimePopupClosed", "1");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://newusmailer.vercel.app/api/interviewer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.ok) {
        alert('Registration successful! Check your email for confirmation.');
        handleClose();
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-semibold text-card-foreground">
            {showForm ? 'Register as Interviewer' : 'Welcome to Newus!'}
          </h3>
        </div>
        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  name="designation"
                  type="text"
                  required
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Developer"
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="expertise">Expertise/Areas of Interest</Label>
              <Textarea
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                placeholder="e.g., Frontend Development, React, Node.js"
                rows={3}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : 'Register'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Back
              </Button>
            </div>
          </form>
        ) : (
          <>
            <img
              src={img}
              alt="Newus Job Fair banner"
              className="w-full h-auto object-contain mb-6 rounded-lg"
              loading="lazy"
              decoding="async"
            />
            <div className="flex gap-3">
              <Button onClick={() => setShowForm(true)} className="flex-1">
                Register as Interviewer
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OneTimePopup;