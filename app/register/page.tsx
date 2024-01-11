"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function Register() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          passwordConfirm,
        }),
      });
      if (response.status === 201) {
        alert("New user created!");
      } else {
        const errorMessage = await response.json(); // Get specific error message
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold text-center">Register</h1>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  required
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit">
                Register
              </Button>
              {/* <div className="text-center text-green-500 dark:text-green-200">
              Success! You have been registered.
            </div> */}
              <div className="text-center mt-4">
                <Button
                  onClick={() => signIn()}
                  className="bg-transparent text-black hover:bg-transparent hover:text-gray-600"
                >
                  Login with an existing user
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
