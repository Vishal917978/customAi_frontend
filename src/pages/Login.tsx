import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("❌ No user found. Please signup first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email === email) {
      alert("✅ Login successful!");
      navigate("/main");
    } else {
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg space-y-4 w-96">
        <h2 className="text-2xl font-bold text-center">Login</h2>
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
