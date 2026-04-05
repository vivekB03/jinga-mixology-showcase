import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import academyImg from "@/assets/academy.jpg";

const AcademySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="academy" className="section-padding relative" ref={ref}>
      {/* Special Offer Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={academyImg}
            alt="Bartending Academy"
            loading="lazy"
            className="w-full h-64 md:h-96 object-cover"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 flex items-center p-8 md:p-16">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-gold" size={20} />
                <span className="text-gold font-body text-sm tracking-[0.2em] uppercase font-semibold">
                  Special Initiative
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Free Bartending Course{" "}
                <span className="text-gradient-gold">for Girls</span>
              </h2>
              <p className="text-cream/60 font-body mb-6 leading-relaxed">
                Empowering women in hospitality — enroll now in our complimentary bartending program.
                Learn mixology, flair techniques, and bar management at zero cost.
              </p>
              <a
                href="https://wa.me/919619885451?text=Hi%2C%20I'm%20interested%20in%20the%20free%20bartending%20course"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
              >
                Enroll Now <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Academy Info */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="font-display text-3xl font-bold text-cream mb-6">
            Learn from the <span className="text-gradient-gold">Best</span>
          </h3>
          <p className="text-cream/50 font-body max-w-2xl mx-auto mb-8 leading-relaxed">
            Join Bhabuji Jinga's Mixology Academy — comprehensive programs covering cocktail & mocktail
            crafting, bar management, flair bartending, and hospitality excellence. Both in-person workshops
            and online courses available.
          </p>
          <a href="#contact" className="btn-outline-gold inline-flex items-center gap-2">
            Join Academy <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademySection;
