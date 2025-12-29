import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { TopicsList } from "@/components/topics-list";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 z-0 p-4 md:p-8">
        <div className="relative w-full h-full">
          <Background
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4"
            placeholder="/alt-placeholder.png"
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <h1 className="text-7xl md:text-9xl font-serif italic font-normal text-white mb-12 text-center drop-shadow-2xl">
            Softy
          </h1>
          <div className="w-full">
            <TopicsList />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
