import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [gmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ API call to backend
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        gmail,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("✅ Signup successful!");
        navigate("/main");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "❌ Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-6 rounded-lg space-y-4 w-96"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <Input
          type="text"
          placeholder="Username"
          className="bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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
          Sign Up
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
