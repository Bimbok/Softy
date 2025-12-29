"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function TopicForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error("Failed to create topic")
      }

      toast({
        title: "Success",
        description: "Topic created successfully",
      })

      setTitle("")
      setContent("")
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create topic",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif italic mb-6 border-b border-white/10 pb-2">Upload New Topic</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-mono uppercase tracking-widest text-white/70">
            Topic Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter topic title"
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/10 rounded-xl h-12"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-mono uppercase tracking-widest text-white/70">
            Content (Markdown + LaTeX)
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content with markdown and LaTeX. Example: **Bold** and $$E=mc^2$$"
            rows={10}
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/10 rounded-xl p-4 min-h-[300px]"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-white/90 font-bold h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.01]">
          {loading ? "Uploading..." : "Upload Topic"}
        </Button>
      </form>
    </div>
  )
}
