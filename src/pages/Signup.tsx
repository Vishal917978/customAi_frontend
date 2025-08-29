import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // abhi backend nahi hai -> localStorage me save kar do
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("✅ Signup successful!");
    navigate("/main");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSignup} className="bg-gray-800 p-6 rounded-lg space-y-4 w-96">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <Input
          type="email"
          placeholder="Email"
          className="bg-gray-700"
          value={email}
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
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
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
