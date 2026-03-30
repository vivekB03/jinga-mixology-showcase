import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import realEvent1 from "@/assets/real-event-1.jpg";
import realAcademy1 from "@/assets/real-academy-1.jpg";
import realAcademy2 from "@/assets/real-academy-2.jpg";
import realAcademy3 from "@/assets/real-academy-3.jpg";
import realTeaching1 from "@/assets/real-teaching-1.jpg";
import realCertificate from "@/assets/real-certificate.jpg";
import realConference from "@/assets/real-conference.jpg";
import realMocktail from "@/assets/real-mocktail.jpg";
import realStudents from "@/assets/real-students.jpg";

const photos = [
  { img: realMocktail, name: "Crafting Perfection", desc: "Signature mocktails at a live event" },
  { img: realEvent1, name: "Event Team", desc: "With the crew at a premium event" },
  { img: realAcademy3, name: "Academy in Action", desc: "Students crafting cocktails at the bar school" },
  { img: realStudents, name: "Training Session", desc: "Hands-on mixology workshop" },
  { img: realAcademy1, name: "Proud Graduates", desc: "Certified bartending professionals" },
  { img: realTeaching1, name: "Guest Lecture", desc: "Sharing knowledge with aspiring bartenders" },
  { img: realConference, name: "Industry Connect", desc: "Networking at hospitality conferences" },
  { img: realCertificate, name: "Certification", desc: "Skill India certified training program" },
  { img: realAcademy2, name: "Batch Training", desc: "Another successful batch of trained bartenders" },
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
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Our Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Photo <span className="text-gradient-gold">Gallery</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
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
