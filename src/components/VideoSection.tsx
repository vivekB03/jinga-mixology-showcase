import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { src: "/videos/video-1.mp4", title: "Mixology in Action" },
  { src: "/videos/video-2.mp4", title: "Event Highlights" },
  { src: "/videos/video-3.mp4", title: "Behind the Bar" },
  { src: "/videos/video-4.mp4", title: "Academy Session" },
  { src: "/videos/video-5.mp4", title: "Cocktail Crafting" },
  { src: "/videos/video-6.mp4", title: "Live Performance" },
];

const VideoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? videos.length - 1 : a - 1));
  const next = () => setActive((a) => (a === videos.length - 1 ? 0 : a + 1));

  return (
    <section id="videos" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Watch & Learn</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Video <span className="text-gradient-gold">Showcase</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Main video */}
          <div className="glass rounded-2xl overflow-hidden aspect-video relative">
            <video
              key={active}
              src={videos[active].src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
              <p className="font-display text-cream text-lg font-semibold">{videos[active].title}</p>
            </div>

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/60 border border-gold/20 flex items-center justify-center text-cream hover:bg-gold/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/60 border border-gold/20 flex items-center justify-center text-cream hover:bg-gold/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {videos.map((v, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`shrink-0 w-28 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === active ? "border-gold shadow-lg shadow-gold/20" : "border-gold/10 opacity-60 hover:opacity-100"
                }`}
              >
                <video src={v.src} muted preload="metadata" className="w-full h-full object-cover pointer-events-none" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
