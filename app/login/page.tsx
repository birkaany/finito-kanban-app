"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {};

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold text-center">Login</h1>
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

              <Button className="w-full" type="submit">
                Login
              </Button>
              {/* <div className="text-center text-green-500 dark:text-green-200">
              Success! You have been registered.
            </div> */}
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
