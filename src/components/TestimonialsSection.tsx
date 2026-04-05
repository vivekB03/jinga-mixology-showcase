import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import headTrainerImg from "@/assets/real-head-trainer.jpg";

const testimonials = [
  {
    name: "Industry Recognition",
    role: "Client Feedback",
    text: "Known for his extensive bartending knowledge and ability to deliver exceptional guest experiences. Recognized for his strong reputation in luxury hospitality and event bartending.",
    stars: 5,
  },
  {
    name: "Academy Student",
    role: "Bartending Graduate",
    text: "The training at Bhabuji's academy was hands-on and practical. I learned everything from classic cocktails to flair bartending. Now I'm working confidently at a premium bar.",
    stars: 5,
  },
  {
    name: "Event Client",
    role: "Corporate Event",
    text: "Bhabuji handled our corporate event bartending flawlessly. The mocktail stations were a massive hit with our guests. Professional, creative, and always on point.",
    stars: 5,
  },
  {
    name: "Hospitality Professional",
    role: "WSET Certified Review",
    text: "As a Head Trainer at Drinq Academy with WSET Level 3 certifications in Wines, Sake, and Tequila, Bhabuji brings unmatched depth and precision to every session.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Real <span className="text-gradient-gold">Feedback</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Trainer image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2 hidden md:block"
          >
            <div className="rounded-2xl overflow-hidden border border-gold/10">
              <img
                src={headTrainerImg}
                alt="Bhabuji Jinaga - Head Trainer & Mixologist"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-3 glass p-8 md:p-10 text-center relative"
          >
            <Quote className="text-gold/20 mx-auto mb-4" size={36} />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="text-cream/70 font-body text-lg md:text-xl leading-relaxed mb-8 italic">
              "{t.text}"
            </p>
            <p className="font-display text-xl font-semibold text-cream">{t.name}</p>
            <p className="text-gold/60 font-body text-sm">{t.role}</p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:border-gold/50 hover:text-gold transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-gold w-6" : "bg-gold/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:border-gold/50 hover:text-gold transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
