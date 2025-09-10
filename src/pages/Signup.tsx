import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [gmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        gmail,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("✅ Signup successful! Please login to continue.");
        navigate("/login"); // Redirect after signup
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "❌ Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a1a] via-[#1a0b2e] to-black px-4">
      <div className="relative w-full max-w-md">
        {/* Neon Glow background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-fuchsia-600 rounded-2xl blur opacity-30 animate-pulse"></div>

        {/* Signup Card */}
        <form
          onSubmit={handleSignup}
          className="relative bg-black/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-purple-700/30 space-y-6 z-10"
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            Join TripleAI
          </h2>
          <p className="text-center text-gray-400 text-sm">
            Compare GPT, Gemini & Perplexity in one place 🚀
          </p>

          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-purple-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Username"
              className="pl-10 bg-gray-900/60 border border-purple-700 focus:border-fuchsia-500 focus:ring-fuchsia-500 text-white rounded-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-purple-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 bg-gray-900/60 border border-purple-700 focus:border-fuchsia-500 focus:ring-fuchsia-500 text-white rounded-xl"
              value={gmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-purple-400 w-5 h-5" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 bg-gray-900/60 border border-purple-700 focus:border-fuchsia-500 focus:ring-fuchsia-500 text-white rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-fuchsia-500/40 transition-all duration-300"
          >
            🚀 Sign Up
          </Button>

          {/* OR divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-purple-700/40"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-purple-700/40"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full py-3 flex items-center justify-center space-x-2 bg-gray-800/70 border border-purple-700/50 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <span
              className="text-fuchsia-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
