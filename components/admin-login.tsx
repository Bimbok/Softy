"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

import { Background } from "@/components/background"

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 z-0 p-4 md:p-8">
        <div className="relative w-full h-full">
          <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" placeholder="/alt-placeholder.png" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-2xl border-2 border-white/20 text-white shadow-2xl rounded-3xl">
          <h1 className="text-4xl font-serif italic mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-mono uppercase tracking-widest text-white/70">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:bg-white/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-mono uppercase tracking-widest text-white/70">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:bg-white/20"
              />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 font-bold h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02]" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}
