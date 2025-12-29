import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { TopicsList } from "@/components/topics-list";

export default function Home() {
  return (
    <main className="h-screen w-full relative overflow-hidden bg-background">
      {/* Framed Container */}
      <div className="fixed inset-0 z-0 p-4 md:p-8 flex flex-col">
        <div className="relative w-full h-full rounded-[42px] md:rounded-[72px] overflow-hidden group">
          {/* Background Video - stays fixed behind content */}
          <div className="absolute inset-0 z-0">
            <Background
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4"
              placeholder="/alt-placeholder.png"
            />
          </div>

          {/* Scrollable Content Layer - contained within the frame */}
          <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar">
            <div className="container mx-auto px-4 py-24 flex flex-col items-center">
              <div className="w-full max-w-6xl flex flex-col items-center">
                <h1 className="text-7xl md:text-9xl font-serif italic font-normal text-white mb-12 text-center drop-shadow-2xl">
                  Softy
                </h1>
                <div className="w-full">
                  <TopicsList />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
