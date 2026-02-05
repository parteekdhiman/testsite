import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
    const navigate = useNavigate();

    const handleRegistrationSuccess = (): void => {
        // Redirect to home page after successful registration
        navigate("/");
    };

    const handleRegistrationCancel = (): void => {
        // Go back to previous page
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-background">
                <div className="container mx-auto px-4 py-8 max-w-3xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Student Registration
                        </h1>
                        <p className="text-muted-foreground">
                            Fill in your details to register for our programs
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-lg p-6 sm:p-8">
                        <RegistrationForm
                            onSuccess={handleRegistrationSuccess}
                            onCancel={handleRegistrationCancel}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Registration;
