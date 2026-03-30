import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import mocktail1 from "@/assets/mocktail-1.jpg";
import mocktail2 from "@/assets/mocktail-2.jpg";
import mocktail3 from "@/assets/mocktail-3.jpg";
import mocktail4 from "@/assets/mocktail-4.jpg";

const mocktails = [
  { img: mocktail1, name: "Virgin Mojito", desc: "Fresh mint & lime" },
  { img: mocktail2, name: "Blue Lagoon", desc: "Tropical paradise" },
  { img: mocktail3, name: "Sunset Punch", desc: "Citrus & passion" },
  { img: mocktail4, name: "Rose Berry Fizz", desc: "Floral elegance" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Signature Creations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Mocktail <span className="text-gradient-gold">Gallery</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {mocktails.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={m.img}
                alt={m.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-display text-lg md:text-xl font-semibold text-cream">{m.name}</h3>
                <p className="text-gold/70 text-sm font-body">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
