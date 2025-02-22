'use client';
import { Clock, Award, BarChart, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Cut down hiring time by 70% with automated technical interviews available 24/7.",
    },
    {
      icon: Award,
      title: "Fair Assessment",
      description: "Ensure consistent evaluation with predefined rubrics and objective scoring.",
    },
    {
      icon: BarChart,
      title: "Data-Driven Insights",
      description: "Get detailed analytics and performance metrics for better hiring decisions.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Break language barriers with voice-to-voice communication support in all languages.",
    },
  ];

  return (
    <section className="py-24 bg-secondary">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Transform your technical hiring process with cutting-edge AI technology
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 backdrop-blur-sm bg-white/50 hover:shadow-lg transition-all duration-300 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
