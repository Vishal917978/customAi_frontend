import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [gmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        gmail,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("✅ Login successful!");
        navigate("/main");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a1a] via-[#1a0b2e] to-black px-4">
      <div className="relative w-full max-w-md">
        {/* Neon Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-fuchsia-600 rounded-2xl blur opacity-30 animate-pulse"></div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="relative bg-black/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-purple-700/30 space-y-6 z-10"
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-400 text-sm">
            Login to continue your AI journey
          </p>

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

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-fuchsia-500/40 transition-all duration-300"
          >
            {loading ? "Logging in..." : "🚀 Login"}
          </Button>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <span
              className="text-fuchsia-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
