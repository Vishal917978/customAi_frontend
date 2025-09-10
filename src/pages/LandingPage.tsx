import React, { useState } from "react";
import {
  ChevronRight,
  Brain,
  MessageSquare,
  Zap,
  Shield,
  Lightbulb,
  Globe,
  Award,
  Github, // Added social icons
  Twitter,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MultiAILanding() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Triple AI Intelligence",
      description:
        "Get responses from ChatGPT, Perplexity, and Gemini simultaneously for comprehensive insights.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
      title: "Compare & Contrast",
      description:
        "Side-by-side comparison of AI responses to help you make informed decisions.",
    },
    {
      icon: <Zap className="w-8 h-8 text-pink-400" />,
      title: "Lightning Fast",
      description:
        "Optimized queries deliver results from all three platforms in seconds.",
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-400" />,
      title: "Privacy First",
      description:
        "Your conversations are secure and never stored on our servers.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
      title: "Creative Catalyst",
      description:
        "Unleash your creativity with diverse perspectives on writing, art, and more.",
    },
    {
      icon: <Globe className="w-8 h-8 text-green-400" />,
      title: "Global Knowledge",
      description:
        "Access a vast ocean of information and stay updated with real-time data.",
    },
  ];

  const testimonials = [
    {
      quote:
        "TripleAI has revolutionized my research workflow. The ability to compare different models' outputs instantly is a game-changer!",
      name: "Sarah Chen",
      title: "Lead Data Scientist",
    },
    {
      quote:
        "The speed and accuracy are unmatched. I can't imagine going back to using just one AI. This is the future.",
      name: "Michael Rodriguez",
      title: "Product Manager",
    },
    {
      quote:
        "Intuitive interface and powerful results. TripleAI is now my go-to tool for brainstorming and content creation.",
      name: "Jessica Lee",
      title: "Freelance Writer",
    },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Demo", "Support"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Sitemap"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black overflow-hidden relative">
      {/* Background Gradient Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-black/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TripleAI</span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-gray-300 hover:text-purple-400 transition-colors duration-300 hidden sm:block"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-black/60 border border-gray-700 rounded-full text-gray-200 text-sm mb-8 backdrop-blur-sm">
          Powered by GPT-4, Gemini Pro & Perplexity
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight animate-fade-in-up">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            All AI Models
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            In One Place
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500">
          Compare responses from GPT, Gemini, and Perplexity simultaneously. Get
          the best insights from leading AI models with a single query.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animation-delay-1000">
          <button
            onClick={() => navigate("/signup")}
            className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
          >
            Start Free Trial
            <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 border-2 border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border border-gray-700 transition-all duration-500 ease-in-out ${
                  hoveredFeature === index
                    ? "bg-white/5 transform scale-105 shadow-xl shadow-purple-500/10"
                    : "bg-white/2"
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-lg"
              >
                <Award className="w-10 h-10 text-yellow-400 mb-4" />
                <p className="text-lg text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to Experience the Future of AI?
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Join thousands of professionals who are already using TripleAI to get
          better insights and make smarter decisions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate("/signup")}
            className="group px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
          >
            Get Started Free
            <ChevronRight className="inline-block w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-12 py-5 border-2 border-white/20 text-white text-xl font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            Schedule Demo
          </button>
        </div>
      </section>

      {/* Footer - Made more 'boomb' */}
      <footer className="relative pt-16 pb-8 bg-black/20 backdrop-blur-sm">
        {/* Gradient Border Trick */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700/50 pb-12 mb-8">
            {/* Logo and Tagline */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">TripleAI</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                The unified intelligence platform. Get the best of every AI,
                simultaneously.
              </p>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index} className="col-span-1">
                <h4 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar (Copyright and Social) */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 sm:mb-0">
              &copy; 2025 TripleAI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#github"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#twitter"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#linkedin"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}