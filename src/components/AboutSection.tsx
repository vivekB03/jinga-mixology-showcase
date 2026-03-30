import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Events Handled" },
  { value: 2000, suffix: "+", label: "Students Trained" },
  { value: 150, suffix: "+", label: "Signature Recipes" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">
      {count}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">The Story</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Crafting Moments,{" "}
            <span className="text-gradient-gold">One Pour at a Time</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass p-8 md:p-12 mb-16 max-w-3xl mx-auto"
        >
          <p className="text-cream/70 font-body leading-relaxed text-lg text-center">
            With over a decade of experience in the hospitality industry, <span className="text-gold font-semibold">Bhabuji Jinga</span> has
            mastered the art of mixology — from crafting exquisite mocktails to leading large-scale events at
            premier hotels. A passionate educator, he has trained thousands of aspiring bartenders through his
            academy, blending creativity with technique to redefine the beverage experience.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass text-center p-6"
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-cream/50 font-body text-sm mt-2 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
