import { type NextRequest, NextResponse } from "next/server"
import { createTopic, getAllTopics } from "@/lib/topics"

export async function GET() {
  try {
    const topics = await getAllTopics()
    return NextResponse.json(topics)
  } catch (error) {
    console.error("Get topics error:", error)
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin session
    const adminSession = request.cookies.get("admin_session")
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const topicId = await createTopic({ title, content })
    return NextResponse.json({ success: true, id: topicId }, { status: 201 })
  } catch (error) {
    console.error("Create topic error:", error)
    return NextResponse.json({ error: "Failed to create topic" }, { status: 500 })
  }
}
