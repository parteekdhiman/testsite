import React from "react";
import { Link } from "react-router-dom";
import { Users, Globe, BookOpen, Briefcase, GraduationCap, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Your ITLearning Hub
            </h1>
            <p className="text-muted-foreground mb-6">
              Welcome to <span className="font-semibold text-foreground">Newus</span>, formerly NIIT Dharamshala Center. We're a dynamic hub at the leading edge of information technology, dedicated to transforming lives through comprehensive education and career solutions.
            </p>

            <div className="flex gap-3 mb-6">
              <Button asChild className="bg-gradient-to-r from-primary to-pink-500">
                <Link to="/about">Learn More</Link>
              </Button>
              <Button asChild variant="outline" className="border-border">
                <a href="#story">Watch Our Story</a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2000+</div>
                <div className="text-sm text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Study Abroad Placements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">28+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl font-semibold mb-3">Why Choose Us</h3>
            <p className="text-muted-foreground mb-4">
              Newus, earlier named as NIIT Dharamshala Center, is your gateway to a transformative educational journey. Our dedication to transforming lives features a huge range of services designed to empower you for success in today's digital world.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              <li className="glass rounded-xl p-3 flex items-start gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Training Programs</div>
                  <div className="text-sm text-muted-foreground">Rigorous training programs that empower individuals with cutting-edge skills.</div>
                </div>
              </li>
              <li className="glass rounded-xl p-3 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">School Solutions</div>
                  <div className="text-sm text-muted-foreground">Cutting-edge technology and methodologies for educational institutions.</div>
                </div>
              </li>
              <li className="glass rounded-xl p-3 flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Study Abroad</div>
                  <div className="text-sm text-muted-foreground">Global opportunities with guidance on college selection, applications, and visas.</div>
                </div>
              </li>
              <li className="glass rounded-xl p-3 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Newus Recruiters</div>
                  <div className="text-sm text-muted-foreground">Connecting talent with leading organizations for career advancement.</div>
                </div>
              </li>
              <li className="glass rounded-xl p-3 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Higher Education</div>
                  <div className="text-sm text-muted-foreground">Customized guidance on admissions, scholarships, and career path selection.</div>
                </div>
              </li>
              <li className="glass rounded-xl p-3 flex items-start gap-3">
                <UserPlus className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Development Center</div>
                  <div className="text-sm text-muted-foreground">Leadership training, soft skills enhancement, and career counseling.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="glass rounded-2xl p-6 col-span-2">
            <h3 className="font-display text-2xl font-bold mb-3">Message from the CEO</h3>
            <p className="text-muted-foreground mb-4">
              Through our rigorous training programs, we empower individuals with the abilities and knowledge needed to thrive in an ever-evolving global landscape. In collaboration with educational establishments, our School Solutions introduce cutting-edge technology and methodologies, creating environments that foster creativity and holistic improvement.
            </p>
            <p className="text-muted-foreground">
              Newus opens doorways to worldwide opportunities with our Study Abroad programs, guiding students through college choice, applications, and visa strategies. Our dedicated division, Newus Recruiters, establishes meaningful connections between expertise and leading organizations.
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h4 className="font-display font-semibold text-lg mb-3">Our Vision</h4>
            <p className="text-muted-foreground mb-4">At Newus, we see education as a transformative force. Together, we'll unlock your potential and shape your future success.</p>

            <h4 className="font-display font-semibold text-lg mb-3">Our Values</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong className="text-foreground">Innovation:</strong> We embrace new technologies to deliver cutting-edge solutions.</li>
              <li><strong className="text-foreground">Integrity:</strong> Honesty and transparency form the foundation of our relationships.</li>
              <li><strong className="text-foreground">Collaboration:</strong> We build strong partnerships and teamwork.</li>
              <li><strong className="text-foreground">Excellence:</strong> We strive for perfection in every detail.</li>
            </ul>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 gradient-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2 gradient-text">Ready to Work Together?</h3>
              <p className="text-muted-foreground">Let's turn your vision into reality. Get in touch with us today and discover how we can help you achieve your goals.</p>
            </div>

            <div className="flex gap-3">
              <Button asChild className="bg-gradient-to-r from-primary to-pink-500">
                <Link to="/contact">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="#work">View Our Work</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
