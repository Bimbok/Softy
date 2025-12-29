import { connectToDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

export interface Topic {
  _id?: ObjectId
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export async function createTopic(topic: Omit<Topic, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const result = await db.collection("topics").insertOne({
    ...topic,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result.insertedId
}

export async function getAllTopics() {
  const { db } = await connectToDatabase()
  return await db.collection<Topic>("topics").find({}).sort({ createdAt: -1 }).toArray()
}

export async function getTopicById(id: string) {
  const { db } = await connectToDatabase()
  return await db.collection<Topic>("topics").findOne({ _id: new ObjectId(id) })
}

export async function updateTopic(id: string, updates: Partial<Omit<Topic, "_id" | "createdAt">>) {
  const { db } = await connectToDatabase()
  const result = await db.collection("topics").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
  )
  return result.modifiedCount > 0
}

export async function deleteTopic(id: string) {
  const { db } = await connectToDatabase()
  const result = await db.collection("topics").deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}
