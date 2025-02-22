"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-down">
                        Revolutionizing Tech Hiring
                    </p>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 animate-fade-down" style={{ animationDelay: "0.1s" }}>
                        AI-Powered Tech Interviews That Save Time and Ensure Fairness
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 animate-fade-down" style={{ animationDelay: "0.2s" }}>
                        Streamline your hiring process with our automated tech interviewer. Get consistent, unbiased evaluations based on predefined rubrics.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                        <Button size="lg" className="rounded-full">
                            Get Started
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;