import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wine, PartyPopper, GraduationCap, Monitor } from "lucide-react";

const services = [
  {
    icon: Wine,
    title: "Event Bartending",
    desc: "Premium cocktail and mocktail service for weddings, corporate events, and gala nights with a bespoke menu tailored to your occasion.",
  },
  {
    icon: PartyPopper,
    title: "Private Parties",
    desc: "Exclusive mixology experiences for intimate gatherings, house parties, and VIP celebrations with personalized drink menus.",
  },
  {
    icon: GraduationCap,
    title: "Workshops & Training",
    desc: "Hands-on bartending workshops for beginners and professionals, covering techniques, flair bartending, and mocktail artistry.",
  },
  {
    icon: Monitor,
    title: "Online Training",
    desc: "Comprehensive virtual courses covering bar management, mixology fundamentals, and advanced techniques accessible worldwide.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">What I Offer</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Premium <span className="text-gradient-gold">Services</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass group p-8 hover:border-gold/30 transition-all duration-500 cursor-pointer hover:glow-gold"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <s.icon className="text-gold" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-cream mb-3">{s.title}</h3>
              <p className="text-cream/50 font-body leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
