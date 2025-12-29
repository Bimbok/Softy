"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { TopicForm } from "@/components/topic-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { Background } from "@/components/background"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/check", { method: "GET" })
        setIsLoggedIn(response.ok)
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsLoggedIn(false)
      toast({
        title: "Success",
        description: "Logged out successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>
  }

  if (!isLoggedIn) {
    return <AdminLogin onSuccess={() => setIsLoggedIn(true)} />
  }

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 z-0 p-4 md:p-8">
        <div className="relative w-full h-full">
          <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" placeholder="/alt-placeholder.png" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center py-12">
        <div className="w-full max-w-4xl bg-black/30 backdrop-blur-2xl border-2 border-white/20 p-8 rounded-3xl shadow-2xl text-white">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h1 className="text-4xl font-serif italic">Admin Dashboard</h1>
            <Button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm">
              Logout
            </Button>
          </div>
          <TopicForm onSuccess={() => {}} />
        </div>
      </div>
    </main>
  )
}
