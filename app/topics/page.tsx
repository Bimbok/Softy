import { TopicsList } from "@/components/topics-list"

export const metadata = {
  title: "Topics | Synecdoche",
  description: "Browse all uploaded topics",
}

export default function TopicsPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Topics</h1>
      <TopicsList />
    </main>
  )
}
