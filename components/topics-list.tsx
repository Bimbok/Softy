"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";

interface Topic {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics");
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (topics.length === 0) {
    return <div className="text-center py-8 text-white/70">No topics yet</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {topics.map((topic) => (
        <motion.div key={topic._id} variants={item}>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-6 m-5 h-full cursor-pointer transition-all duration-500 hover:scale-[1.05] bg-transparent border-2 border-white/40 backdrop-blur-md text-white shadow-none hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:bg-white/5 group rounded-2xl">
                <h2 className="text-2xl font-serif italic mb-3 line-clamp-2 group-hover:text-blue-100 transition-colors font-semibold">
                  {topic.title}
                </h2>
                                <div className="prose prose-sm prose-invert max-w-none line-clamp-4 opacity-90 pointer-events-none font-medium tracking-wide">
                                  <ReactMarkdown 
                                    remarkPlugins={[remarkMath]} 
                                    rehypePlugins={[rehypeKatex as any]}
                                    allowedElements={["p", "strong", "em", "code"]} 
                                    unwrapDisallowed
                                  >
                                    {topic.content}
                                  </ReactMarkdown>
                                </div>
                
                <div className="text-xs text-white/40 mt-6 flex items-center justify-between font-mono uppercase tracking-widest">
                  <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Open
                  </span>
                </div>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-transparent backdrop-blur-3xl border-2 border-white/30 text-white p-10 shadow-2xl rounded-2xl sm:rounded-2xl data-[state=open]:duration-500 data-[state=closed]:duration-300">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-5xl font-serif italic text-white mb-4 drop-shadow-2xl">
                  {topic.title}
                </DialogTitle>
                <div className="text-sm text-white/60 font-mono uppercase tracking-widest">
                  Published on{" "}
                  {new Date(topic.createdAt).toLocaleDateString(undefined, {
                    dateStyle: "long",
                  })}
                </div>
              </DialogHeader>

              <div className="prose prose-xl prose-invert max-w-none leading-relaxed font-light text-white selection:bg-white/20">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex as any]}
                >
                  {topic.content}
                </ReactMarkdown>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </motion.div>
  );
}

