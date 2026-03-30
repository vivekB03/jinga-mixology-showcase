import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Hotel Manager, Taj Group",
    text: "Bhabuji's cocktail service at our annual gala was extraordinary. His creativity and professionalism left our guests amazed. Absolutely top-tier.",
    stars: 5,
  },
  {
    name: "Priya Mehra",
    role: "Academy Graduate",
    text: "The free bartending course changed my life. I went from zero knowledge to confidently working at a 5-star hotel bar within months. Forever grateful!",
    stars: 5,
  },
  {
    name: "Amit Kapoor",
    role: "Event Planner",
    text: "We've hired Bhabuji for multiple corporate events. His mocktail stations are always the highlight. Reliable, creative, and a true showman behind the bar.",
    stars: 5,
  },
  {
    name: "Sneha Patel",
    role: "Wedding Client",
    text: "Our wedding cocktail experience was magical. The bespoke menu Bhabuji designed perfectly matched our theme. Guests are still talking about it!",
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            What People <span className="text-gradient-gold">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass p-8 md:p-12 text-center relative"
        >
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
    </section>
  );
};

export default TestimonialsSection;
