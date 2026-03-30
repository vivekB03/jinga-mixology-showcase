import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

const VideoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          className="glass p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Play className="text-gold" size={32} />
          </div>
          <h3 className="font-display text-2xl font-bold text-cream mb-4">Videos Coming Soon</h3>
          <p className="text-cream/50 font-body max-w-lg mx-auto">
            Upload your video files and they'll appear here in a beautiful slider format — showcasing
            your bartending skills, academy sessions, and event highlights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
