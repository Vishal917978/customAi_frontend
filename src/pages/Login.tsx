import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [gmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Call backend API
      const response = await axios.post("http://localhost:5000/auth/login", {
        gmail,
        password,
      });

      if (response.status === 200) {
        // you might receive a token or user data
        const { token, user } = response.data;

        // store token in localStorage (optional)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("✅ Login successful!");
        navigate("/main");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg space-y-4 w-96"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          className="bg-gray-700"
          value={gmail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          className="bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Login
        </Button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
