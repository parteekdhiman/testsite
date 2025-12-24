import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { checkHealth, submitLead, subscribeNewsletter, submitCourseInquiry } from "@/utils/apiService";

const ApiTest = () => {
  const { toast } = useToast();
  const [healthStatus, setHealthStatus] = useState<string>("Checking...");
  const [isHealthy, setIsHealthy] = useState<boolean>(false);

  // Form states
  const [leadData, setLeadData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    message: "Test lead message"
  });

  const [newsletterData, setNewsletterData] = useState({
    email: "subscriber@example.com"
  });

  const [courseInquiryData, setCourseInquiryData] = useState({
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "1234567890",
    course: "Web Development",
    brochureUrl: ""
  });

  // Check health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await checkHealth();
      if (response.status === "OK") {
        setHealthStatus("✅ Backend is healthy and running");
        setIsHealthy(true);
        toast({
          title: "Connection Successful",
          description: "Frontend successfully connected to backend API"
        });
      } else {
        setHealthStatus("⚠️ Backend responded but status unknown");
        setIsHealthy(false);
      }
    } catch (error) {
      setHealthStatus("❌ Backend connection failed");
      setIsHealthy(false);
      toast({
        title: "Connection Failed",
        description: "Could not connect to backend API",
        variant: "destructive"
      });
      console.error("Health check error:", error);
    }
  };

  const testLeadSubmission = async () => {
    try {
      const response = await submitLead(leadData);
      if (response.ok) {
        toast({
          title: "Lead Submission Success",
          description: "Lead submitted successfully to backend"
        });
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Lead Submission Failed",
        description: `Error: ${(error as Error).message}`,
        variant: "destructive"
      });
      console.error("Lead submission error:", error);
    }
  };

  const testNewsletterSubscription = async () => {
    try {
      const response = await subscribeNewsletter(newsletterData);
      if (response.ok) {
        toast({
          title: "Newsletter Subscription Success",
          description: "Successfully subscribed to newsletter"
        });
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Newsletter Subscription Failed",
        description: `Error: ${(error as Error).message}`,
        variant: "destructive"
      });
      console.error("Newsletter subscription error:", error);
    }
  };

  const testCourseInquiry = async () => {
    try {
      const response = await submitCourseInquiry(courseInquiryData);
      if (response.ok) {
        toast({
          title: "Course Inquiry Success",
          description: "Course inquiry submitted successfully"
        });
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Course Inquiry Failed",
        description: `Error: ${(error as Error).message}`,
        variant: "destructive"
      });
      console.error("Course inquiry error:", error);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">API Connection Test</h1>
          <p className="text-muted-foreground mb-8">Test the connection between frontend and backend services</p>

          {/* Health Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Backend Health Check</CardTitle>
              <CardDescription>Current status of the backend API</CardDescription>
            </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${isHealthy ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <p className={isHealthy ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                {healthStatus}
              </p>
            </div>
            <Button onClick={checkApiHealth} className="mt-4">Refresh Health Check</Button>
          </CardContent>
        </Card>

        {/* Lead Submission Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Lead Submission Test</CardTitle>
            <CardDescription>Test submitting a lead to the backend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={leadData.firstName}
                  onChange={(e) => setLeadData({...leadData, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={leadData.lastName}
                  onChange={(e) => setLeadData({...leadData, lastName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="leadEmail">Email</Label>
                <Input
                  id="leadEmail"
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={leadData.message}
                onChange={(e) => setLeadData({...leadData, message: e.target.value})}
              />
            </div>
            <Button onClick={testLeadSubmission}>Submit Lead</Button>
          </CardContent>
        </Card>

        {/* Newsletter Subscription Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Newsletter Subscription Test</CardTitle>
            <CardDescription>Test subscribing to the newsletter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="newsletterEmail">Email</Label>
              <Input
                id="newsletterEmail"
                type="email"
                value={newsletterData.email}
                onChange={(e) => setNewsletterData({...newsletterData, email: e.target.value})}
              />
            </div>
            <Button onClick={testNewsletterSubscription}>Subscribe to Newsletter</Button>
          </CardContent>
        </Card>

        {/* Course Inquiry Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Inquiry Test</CardTitle>
            <CardDescription>Test submitting a course inquiry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={courseInquiryData.fullName}
                  onChange={(e) => setCourseInquiryData({...courseInquiryData, fullName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="inquiryEmail">Email</Label>
                <Input
                  id="inquiryEmail"
                  type="email"
                  value={courseInquiryData.email}
                  onChange={(e) => setCourseInquiryData({...courseInquiryData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="inquiryPhone">Phone</Label>
                <Input
                  id="inquiryPhone"
                  value={courseInquiryData.phone}
                  onChange={(e) => setCourseInquiryData({...courseInquiryData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  value={courseInquiryData.course}
                  onChange={(e) => setCourseInquiryData({...courseInquiryData, course: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="brochureUrl">Brochure URL (optional)</Label>
                <Input
                  id="brochureUrl"
                  value={courseInquiryData.brochureUrl}
                  onChange={(e) => setCourseInquiryData({...courseInquiryData, brochureUrl: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={testCourseInquiry}>Submit Course Inquiry</Button>
          </CardContent>
        </Card>
      </div>
      </div>
    </PageTransition>
  );
};

export default ApiTest;