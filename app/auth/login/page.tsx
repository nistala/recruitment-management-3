"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// ✅ Hardcoded credentials for demo
// ✅ Hardcoded credentials for demo
const users = [
  {
    email: "hmarada@miraclesoft.com",
    password: "Hema123",
    role: "candidate",
    redirect: "/",
    name: "Hema Marada",
    avatar: "https://images.miraclesoft.com/employee-profile-pics/hmarada.png",
  },
  {
    email: "snistala@miraclesoft.com",
    password: "Kartik123",
    role: "employer",
    redirect: "/",
    name: "Sai Kartik Nistala",
    avatar: "https://images.miraclesoft.com/employee-profile-pics/snistala.png",
  },
  {
    email: "vkandregula@miraclesoft.com",
    password: "Prasad123",
    role: "admin",
    redirect: "/",
    name: "Prasad Kandregula",
    avatar: "https://images.miraclesoft.com/employee-profile-pics/vkandregula.png",
  },
  {
    email: "pgrandhi2@miraclesoft.com",
    password: "Prasanth123",
    role: "sales",
    redirect: "/",
    name: "Prasanth Grandi",
    avatar: "https://images.miraclesoft.com/employee-profile-pics/pgrandhi2.png",
  },
  {
    email: "smadaka@miraclesoft.com",
    password: "Srinu123",
    role: "college",
    redirect: "/",
    name: "Srinu Madaka",
    avatar: "https://images.miraclesoft.com/employee-profile-pics/smadaka.png",
  },
];


export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleLogin = async () => {
  setIsLoading(true);
  setError("");

  try {
    // find matching user
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    // save role + login + userData in localStorage
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("isLogin", JSON.stringify(true));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      })
    );

    // redirect based on role
    router.push(user.redirect);
  } catch {
    setError("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Login to Unemployee
          </CardTitle>
          <CardDescription>Use demo credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoading || !formData.email || !formData.password}
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>

          {/* Error message */}
          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Info about credentials */}
          <div className="mt-6 text-sm text-gray-500">
            <p><b>Sample Credentials:</b></p>
            <ul className="list-disc list-inside">

              <li>hmarada@miraclesoft.com / Hema123</li>
              <li>snistala@miraclesoft.com / Kartik123</li>
              <li>vkandregula@miraclesoft.com / Prasad123</li>
              <li>pgrandi@miraclesoft.com / Prasanth123</li>
              <li>smadaka@miraclesoft.com / Srinu123</li>
            </ul>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
