import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Scissors, Palette, Star } from "lucide-react";

const IFS = () => {
    const features = [
        {
            icon: <Scissors className="w-6 h-6" />,
            title: "Couture Design",
            description: "Master the art of high-end garment construction and design."
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Styling Mastery",
            description: "Learn professional styling for editorials, celebrities, and personal branding."
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Trend Forecasting",
            description: "Stay ahead of the curve with our industry-leading trend analysis modules."
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Global Industry Ties",
            description: "Gain exclusive access to internships and placements with top fashion houses."
        }
    ];

    return (
        <div className="min-h-screen">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                    {/* Video Background */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/src/assets/ifsbackground.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {/* Overlay for readability */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
                        <div className="backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-[2rem] border border-white/20 shadow-2xl">
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-rose-200 uppercase bg-rose-500/20 rounded-full backdrop-blur-sm border border-rose-500/30">
                                Launching Summer 2026
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight">
                                newus  Institute of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-400 drop-shadow-sm">
                                    Fashion & Styling
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-rose-50 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                Empowering the next generation of creative visionaries. Where tradition meets high-tech haute couture.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                                <Input
                                    placeholder="Enter your email for early access"
                                    className="h-12 border-white/20 focus:ring-rose-400 bg-white/10 backdrop-blur-md text-white placeholder:text-rose-100/50 rounded-full px-6"
                                />
                                <Button className="h-12 px-10 bg-rose-600 hover:bg-rose-500 text-white transition-all duration-300 transform hover:scale-105 rounded-full shadow-lg shadow-rose-900/20">
                                    Join Waitlist
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 text-center mb-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Redefining Fashion Education</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">Luxury learning experiences designed specifically for the dreamers, the makers, and the trendsetters.</p>
                    </div>

                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-3xl bg-rose-50/50 hover:bg-rose-100/50 transition-all duration-500 border border-rose-100/20 animate-fade-in"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#1a1a1a]" />
                    <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in" style={{ animationDelay: '800ms' }}>
                        <div>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                                Be the First to Experience <br /> the <span className="text-rose-400 italic">Future of Vogue</span>
                            </h2>
                            <p className="text-rose-100/70 text-lg mb-12 max-w-2xl mx-auto font-light">
                                Sign up now to receive an exclusive invitation to our launch event and early bird scholarship opportunities.
                            </p>
                            <Button variant="outline" className="border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white h-14 px-10 text-lg rounded-full transition-all duration-300">
                                Apply for Early Admission
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default IFS;
